import {v4 as uuid} from 'uuid';
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { GardenRepository } from "../../src/app/features/users/repositories/garden.repository";
import { assignGardenHelper } from "../../tests/helpers/assign-garden.helper";
import { GardenNoteModel } from "../../src/app/features/gardens/models/garden-note.model";
import { Repository } from 'typeorm';
import { GardenModel } from '../../src/app/features/gardens/models/garden.model';

describe.only("/gardens/garden-details/{id} integration", () => {
    describe("user", () => {
        it("throws error when user is no assigned to garden", async () => {
            const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });
            const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
            const garden = gardens![0];
            const { accessToken } = loginHelper(global.container, user);

            await request(global.container.resolve("app"))
            .get(`/api/gardens/garden-details/${garden.id}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(400)
        })
        it("returns garden details for user", async () => {
            const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });

            const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
            const garden = gardens![0];

            const { accessToken } = loginHelper(global.container, user);
            await assignGardenHelper(global.container, user, garden);

            await request(global.container.resolve("app"))
            .get(`/api/gardens/garden-details/${garden.id}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.deep.equal(garden);
            })
        });
    })
    describe("manager", () => {
        it("returns garden details for manager(details + who currently is assigned + notes)", async () => {
            const gardenRepository: GardenRepository = global.container.resolve('gardenRepository');
            const gardenNoteRepository: Repository<GardenModel> = global.container.resolve('gardenNoteRepository');

            const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });

            const manager =  users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
            const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
            const garden = gardens![0];

            const { accessToken } = loginHelper(global.container, manager);
            await assignGardenHelper(global.container, user, garden);

            const gardenNote = GardenNoteModel.create({
                id: uuid(),
                content: 'abc'
            });
            garden.gardenNote = gardenNote;
            await gardenNoteRepository.save(gardenNote);
            await gardenRepository.save(garden);

            const {password, ...rest} = user;

            const expectedResponse = {
                ...garden,
                assignedUser: rest
            }

            await request(global.container.resolve("app"))
            .get(`/api/gardens/garden-details/${garden.id}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.deep.equal(expectedResponse);
            })
        })
    })
});
