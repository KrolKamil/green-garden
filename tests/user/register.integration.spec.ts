import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { WorkspaceRepository } from "../../src/app/features/users/repositories/workspace.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";

describe("/users/register integration", () => {
  it("register manager", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve('userBaseRepository');
    const workspaceRepository: WorkspaceRepository = global.container.resolve('workspaceRepository');
    return request(global.container.resolve("app"))
      .post("/api/users/register")
      .send({
          email: 'example-email@test.com',
          password: '123456'
        })
      .expect(200)
      .then(async () => {
        const registeredManager = await userBaseRepository.findOneOrFail({relations: ['workspace']});
        const registeredWorkspace = await workspaceRepository.findOneOrFail({});
        expect(registeredManager.type).to.be.equal(UserBaseType.MANAGER);
        expect(registeredManager.workspace).to.be.deep.equal(registeredWorkspace);
      });
  });
  it("register user", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve('userBaseRepository');
    const workspaceRepository: WorkspaceRepository = global.container.resolve('workspaceRepository');
    await request(global.container.resolve("app"))
      .post("/api/users/register")
      .send({
          email: 'example-email@test.com',
          password: '123456'
        });
    
    const workspace = await workspaceRepository.findOneOrFail({});

        await request(global.container.resolve("app"))
        .post("/api/users/register")
        .send({
            email: 'example-email+user@test.com',
            password: '123456',
            workspace: workspace.id
          });
      
    const user = await userBaseRepository.findOne({type: UserBaseType.USER});
    expect(user).to.not.be.undefined;
  })
});
