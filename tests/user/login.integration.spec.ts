import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { TokenService } from "../../src/app/services/token.service";

describe("/users/login integration", () => {
  it("login as user", async () => {
    const tokenService: TokenService = global.container.resolve("tokenService");
    const { users, workspaces } = await seedApplication(global.container, {
      workspacesAmount: 1,
      usersAmount: 1,
    });

    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    return request(global.container.resolve("app"))
      .post("/api/users/login")
      .send({
        email: user.email,
        password: "123456",
        workspaceId: workspaces[0].id,
      })
      .then(async (res) => {
        const userDTO = await tokenService.verifyAccessToken(res.body.accessToken);
        expect(userDTO.type).to.be.equal(UserBaseType.USER);
        expect(res.body).to.haveOwnProperty("accessToken");
        expect(res.body).to.haveOwnProperty("refreshToken");
      });
  });
  it("login as manager", async () => {
    const tokenService: TokenService = global.container.resolve("tokenService");
    const { users, workspaces } = await seedApplication(global.container, {
      workspacesAmount: 1,
      usersAmount: 1,
    });

    const user = users.find((singleUser) => singleUser.type !== UserBaseType.USER)!;
    return request(global.container.resolve("app"))
      .post("/api/users/login")
      .send({
        email: user.email,
        password: "123456",
        workspaceId: workspaces[0].id,
      })
      .then(async (res) => {
        const userDTO = await tokenService.verifyAccessToken(res.body.accessToken);
        expect(userDTO.type).to.be.equal(UserBaseType.MANAGER);
        expect(res.body).to.haveOwnProperty("accessToken");
        expect(res.body).to.haveOwnProperty("refreshToken");
      });
  });
});
