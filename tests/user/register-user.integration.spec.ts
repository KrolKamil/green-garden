import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { WorkspaceRepository } from "../../src/app/features/users/repositories/workspace.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";

describe("/users/register-user integration", () => {
  it("register user", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const workspaceRepository: WorkspaceRepository = global.container.resolve("workspaceRepository");
    await request(global.container.resolve("app")).post("/api/users/register-manager").send({
      email: "example-email@test.com",
      password: "123456",
      workspaceName: "garden",
    });

    const workspace = await workspaceRepository.findOneOrFail({});

    await request(global.container.resolve("app")).post("/api/users/register-user").send({
      email: "example-email+user@test.com",
      password: "123456",
      workspaceId: workspace.id,
    });

    const user = await userBaseRepository.findOne({ type: UserBaseType.USER });
    // eslint-disable-next-line
    expect(user).to.not.be.undefined;
  });
});
