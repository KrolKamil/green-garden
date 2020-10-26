import { expect, use } from "chai";
import "mocha";
import * as chaiAsPromised from "chai-as-promised";
import { seedApplication } from "../seed/seed-application";
import { MiddlewareType } from "../../src/shared/middleware-type/middleware.type";
import { HttpError } from "../../src/errors/http.error";
import { loginHelper } from "../helpers/login.helper";

use(chaiAsPromised);

describe("authenicationMiddleware integration", () => {
  it("throws error on missing token", async () => {
    const authenticationMiddleware: MiddlewareType = global.container.resolve("authenticationMiddleware");
    const req = { headers: {} } as any;
    const res = {} as any;
    const next = (err: any) => {
      expect(err).to.be.instanceOf(HttpError);
    };
    await authenticationMiddleware(req, res, next);
  });
  it("throws error on invalid token", async () => {
    const authenticationMiddleware: MiddlewareType = global.container.resolve("authenticationMiddleware");
    const req = {
      headers: {
        authorization: "abc",
      },
    } as any;
    const res = {} as any;
    const next = (err: any) => {
      expect(err).to.be.instanceOf(HttpError);
    };
    await authenticationMiddleware(req, res, next);
  });
  it("allow acces on valid Bearer token", async () => {
    const { users } = await seedApplication(global.container, {
      usersAmount: 1,
    });
    const { accessToken } = loginHelper(global.container, users[0]);
    const authenticationMiddleware: MiddlewareType = global.container.resolve("authenticationMiddleware");
    const req = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    } as any;
    const res = { locals: {} } as any;
    const next = (err: any) => {
      // eslint-disable-next-line
      expect(err).to.be.undefined;
    };
    await authenticationMiddleware(req, res, next);
  });
});
