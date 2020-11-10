import { expect, use } from "chai";
import "mocha";
import * as chaiAsPromised from "chai-as-promised";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { HttpError } from "../../src/errors/http.error";
import { AssignedGardensRepository } from "../../src/app/features/users/repositories/assigned-gardens.repository";

use(chaiAsPromised);

describe("/gardens/assign-garden integration", () => { 
  it("throws error on invalid user", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    request(global.container.resolve("app"))
    .post(`/api/gardens/assign-garden`)
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
    .post(`/api/gardens/assign-garden`)
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
  it("assign user to garden", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    await request(global.container.resolve("app"))
    .post(`/api/gardens/assign-garden`)
    .send({
        userId: user.id,
        gardenId: garden.id
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(200);

    const assignedGardensRepository: AssignedGardensRepository = global.container.resolve('assignedGardensRepository');
    const assignedGardens = await assignedGardensRepository.findOne({
        relations: ['userBase', 'garden']
    });
    expect(assignedGardens?.userBase.id).to.be.equal(user.id);
    expect(assignedGardens?.garden.id).to.be.equal(garden.id);
  });
  it("throws error on occupied garden", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    await request(global.container.resolve("app"))
    .post(`/api/gardens/assign-garden`)
    .send({
        userId: user.id,
        gardenId: garden.id
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(200);

    request(global.container.resolve("app"))
    .post(`/api/gardens/assign-garden`)
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
