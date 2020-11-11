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
import { GardenRepository } from '../../src/app/features/users/repositories/garden.repository';

use(chaiAsPromised);

describe("/gardens/garden-set-active integration", () => { 
  it("throws error on invalid garden id", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    request(global.container.resolve("app"))
    .post(`/api/gardens/garden-set-active`)
    .send({
        gardenId: 'invalid_garden_id',
        active: false
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(400)
    .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
    });
  })
  it("throws error on setting active to false when garden is occupied by user", async () => {
    const assignedGardensRepository: AssignedGardensRepository = global.container.resolve('assignedGardensRepository');
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    await assignedGardensRepository.save(AssignedGardensModel.create({
        id: uuid(),
        userBase: user,
        garden,
        assignedAt: new Date()
    }));

    request(global.container.resolve("app"))
    .post(`/api/gardens/garden-set-active`)
    .send({
        gardenId: garden.id,
        active: false
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(400)
    .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
    });
  })
  it("sets garden to inactive", async () => {
    const gardenRepository: GardenRepository = global.container.resolve('gardenRepository');
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    await request(global.container.resolve("app"))
    .post(`/api/gardens/garden-set-active`)
    .send({
        gardenId: garden.id,
        active: false
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(200)
    const updatedGarden = await gardenRepository.findOne({});
    expect(updatedGarden?.active).to.be.equal(false);
  })
  it("sets garden to active", async () => {
    const gardenRepository: GardenRepository = global.container.resolve('gardenRepository');
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);
    const garden = gardens![0];

    garden.active = false;
    await gardenRepository.save(garden);

    await request(global.container.resolve("app"))
    .post(`/api/gardens/garden-set-active`)
    .send({
        gardenId: garden.id,
        active: true
    })
    .set("Authorization", `Bearer ${accessToken}`)
    .expect(200)
    const updatedGarden = await gardenRepository.findOne({});
    expect(updatedGarden?.active).to.be.equal(true);
  })
});
