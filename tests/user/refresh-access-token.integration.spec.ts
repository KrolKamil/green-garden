import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { TokenService } from "../../src/app/services/token.service";
import { createUserBaseDTO } from "../../src/app/features/users/models/user-base.dto";

describe("/users/refresh-access-token integration", () => {
  it("refreshes access token", async () => {
    const { users } = await seedApplication(global.container, {
      usersAmount: 1,
    });
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;

    const { refreshToken } = loginHelper(global.container, user);

    return request(global.container.resolve("app"))
      .post("/api/users/refresh-access-token")
      .send({
        refreshToken,
      })
      .then(async (res) => {
        const tokenService: TokenService = global.container.resolve("tokenService");
        const userDTO = await tokenService.verifyAccessToken(res.body.accessToken);
        const expectedUserDTO = createUserBaseDTO(user);
        expect(userDTO).to.be.deep.equal(expectedUserDTO);
        expect(res.body).to.haveOwnProperty("accessToken");
        expect(res.body).to.haveOwnProperty("refreshToken");
      });
  });
});
