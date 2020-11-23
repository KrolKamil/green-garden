import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";

describe("/users/list integration", () => {
  it("return list of users", async () => {
    const usersAmount = 50;
    const { users } = await seedApplication(global.container, {
      usersAmount,
    });

    const user = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, user);

    return request(global.container.resolve("app"))
      .get("/api/users/list")
      .set("Authorization", `Bearer ${accessToken}`)
      .then(async (res) => {
        expect(res.body.length).to.be.equal(usersAmount);
        const expectedUser = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
        delete expectedUser.password;
        expect(res.body[0]).to.be.deep.equal(JSON.parse(JSON.stringify(expectedUser)));
      });
  });
});
