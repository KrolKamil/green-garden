import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { WorkspaceRepository } from "../../src/app/features/users/repositories/workspace.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";

describe("/users/register-manager integration", () => {
  it("register manager", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const workspaceRepository: WorkspaceRepository = global.container.resolve("workspaceRepository");
    return request(global.container.resolve("app"))
      .post("/api/users/register-manager")
      .send({
        email: "example-email@test.com",
        password: "123456",
        workspaceName: "garden",
      })
      .expect(200)
      .then(async () => {
        const registeredManager = await userBaseRepository.findOneOrFail({ relations: ["workspace"] });
        const registeredWorkspace = await workspaceRepository.findOneOrFail({});
        expect(registeredManager.type).to.be.equal(UserBaseType.MANAGER);
        expect(registeredManager.workspace).to.be.deep.equal(registeredWorkspace);
      });
  });
});
