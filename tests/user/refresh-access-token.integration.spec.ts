import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../../tests/seed/seed-application";
import { loginUserHelper } from "../../tests/helpers/login.helper";

describe("/users/refresh-access-token integration", () => {
  it("refreshes access token", async () => {
    const {users} = await seedApplication(global.container, {
        workspacesAmount: 1,
        usersAmount: 1,
    });
    const user = users.find((user) => user.type === UserBaseType.USER)!;

    const {refreshToken} = loginUserHelper(global.container, user);

    return request(global.container.resolve("app"))
      .post("/api/users/refresh-access-token")
      // .set('Authorization', `Bearer ${accessToken}`)
      .send({
          refreshToken
        })
        .then(async (res) => {
        // @todo create test env config and indject it only for tests
        // const userDTO = await tokenService.verifyAccessToken(res.body.accessToken);
        // expect(userDTO.type).to.be.equal(UserBaseType.USER);
        expect(res.body).to.haveOwnProperty('accessToken');
        expect(res.body).to.haveOwnProperty('refreshToken');
      });
  });
});
