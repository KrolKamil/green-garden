import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../../tests/helpers/login.helper";

describe("/users/list integration", () => {
  it("return list of users", async () => {
    const usersAmount = 50;
    const { users } = await seedApplication(global.container, {
      usersAmount
    });

    const user = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const {accessToken} = loginHelper(global.container, user);

    return request(global.container.resolve("app"))
      .get("/api/users/list")
      .set('Authorization', `Bearer ${accessToken}`)
      .then(async (res) => {
        expect(res.body.length).to.be.equal(usersAmount);
        const {id, email, name, surname} = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
        expect(res.body[0]).to.be.deep.equal({id, email, name, surname})
      });
  });
});
