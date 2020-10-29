import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { TokenService } from "../../src/app/services/token.service";
import { loginHelper } from "../helpers/login.helper";

describe.only("/users/details integration", () => {
  it("gets self details", async () => {
    const { users } = await seedApplication(global.container, {
      usersAmount: 1,
    });
    
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const {accessToken} = loginHelper(global.container, user);

    return request(global.container.resolve("app"))
      .get("/api/users/details")
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body.id).to.be.equal(user.id);
      });
  });
});
