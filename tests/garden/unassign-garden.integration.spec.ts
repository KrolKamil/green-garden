import {v4 as uuid} from 'uuid';
import { expect, use } from "chai";
import "mocha";
import * as chaiAsPromised from "chai-as-promised";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { HttpError } from "../../src/errors/http.error";
import { AssignedGardensRepository } from "../../src/app/features/users/repositories/assigned-gardens.repository";
import { AssignedGardensModel } from "../../src/app/features/gardens/models/assigned-gardens.model";

use(chaiAsPromised);

describe("/gardens/unassign-garden integration", () => { 
  it("throws error on invalid user", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    request(global.container.resolve("app"))
    .post(`/api/gardens/unassign-garden`)
    .send({
        userId: 'invalid_user_id',
        gardenId: garden.id
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(400)
    .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
    })
  })
  it("throws error on invalid garden",async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    request(global.container.resolve("app"))
    .post(`/api/gardens/unassign-garden`)
    .send({
        userId: user.id,
        gardenId: 'invalid_garden_id'
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(400)
    .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
    })
  })
  it("throws error on missing assigned garden", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];
    request(global.container.resolve("app"))
    .post(`/api/gardens/unassign-garden`)
    .send({
        userId: user.id,
        gardenId: garden.id
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(400)
    .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
    })
  });
  it("unassign garden from user", async () => {
    const assignedGardensRepository: AssignedGardensRepository = global.container.resolve('assignedGardensRepository');
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    await assignedGardensRepository
    .save(AssignedGardensModel.create({
      id: uuid(),
      userBase: user,
      garden,
      assignedAt: new Date()
    }));


    await request(global.container.resolve("app"))
    .post(`/api/gardens/unassign-garden`)
    .send({
        userId: user.id,
        gardenId: garden.id
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(200);

    const assignedGardens = await assignedGardensRepository.findOne({
        relations: ['userBase', 'garden']
    });

    expect(assignedGardens?.userBase.id).to.be.equal(user.id);
    expect(assignedGardens?.garden.id).to.be.equal(garden.id);
    expect(assignedGardens?.unassignedAt).to.be.not.equal(null);
  });
  it("throws error on already unassign garden", async () => {
    const assignedGardensRepository: AssignedGardensRepository = global.container.resolve('assignedGardensRepository');
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    const assignedGardens = AssignedGardensModel.create({
        id: uuid(),
        userBase: user,
        garden,
        assignedAt: new Date()
      });

      assignedGardens.unassignedAt = new Date();

    await assignedGardensRepository.save(assignedGardens);

    request(global.container.resolve("app"))
    .post(`/api/gardens/unassign-garden`)
    .send({
        userId: user.id,
        gardenId: garden.id
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(400)
    .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
    })
  });
});
