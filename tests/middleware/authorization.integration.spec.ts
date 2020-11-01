import { expect, use } from "chai";
import "mocha";
import * as chaiAsPromised from "chai-as-promised";
import { seedApplication } from "../seed/seed-application";
import { AppError } from "../../src/errors/app.error";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { createUserBaseDTO } from "../../src/app/features/users/models/user-base.dto";
import { CreateAuthorizationMiddleware } from "../../src/middleware/authorization";

use(chaiAsPromised);

describe("authorizationMiddleware integration", () => {
  it("throws app error on missing userDTO", async () => {
    const createAuthorizationMiddleware: CreateAuthorizationMiddleware = global.container.resolve("createAuthorizationMiddleware");
    const authorizationMiddleware = createAuthorizationMiddleware([UserBaseType.MANAGER]);
    const req = { headers: {} } as any;
    const res = {} as any;
    const next = (err: any) => {
      expect(err).to.be.instanceOf(AppError);
    };
    await authorizationMiddleware(req, res, next);
  });
  it("throws http error on user with wrong type", async () => {
    const {users} = await seedApplication(global.container, {usersAmount: 1});
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const userDTO = createUserBaseDTO(user)

    const createAuthorizationMiddleware: CreateAuthorizationMiddleware = global.container.resolve("createAuthorizationMiddleware");
    const authorizationMiddleware = createAuthorizationMiddleware([UserBaseType.MANAGER]);
    const req = { headers: {} } as any;
    const res = {
        locals: {
            userDTO
        }
    } as any;
    const next = (err: any) => {
      expect(err).to.be.instanceOf(AppError);
    };
    await authorizationMiddleware(req, res, next);
  });
  it("allows access for valid user type", async () => {
    const {users} = await seedApplication(global.container, {usersAmount: 1});
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const userDTO = createUserBaseDTO(user)

    const createAuthorizationMiddleware: CreateAuthorizationMiddleware = global.container.resolve("createAuthorizationMiddleware");
    const authorizationMiddleware = createAuthorizationMiddleware([UserBaseType.USER]);
    const req = { headers: {} } as any;
    const res = {
        locals: {
            userDTO
        }
    } as any;
    const next = (err: any) => {
      expect(err).to.be.equal(undefined);
    };
    await authorizationMiddleware(req, res, next);
  });
});
