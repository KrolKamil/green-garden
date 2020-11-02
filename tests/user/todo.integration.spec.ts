import {v4 as uuid} from 'uuid';
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../../tests/seed/seed-application";
import e = require("express");
import { loginHelper } from "../../tests/helpers/login.helper";
import { UserNoteModel } from "../../src/app/features/users/models/user-note.model";
import { Repository } from 'typeorm';

describe("/users/:id/details integration", () => {
  it("gets user details by manager", async () => {
    const {users} = await seedApplication(global.container, {usersAmount: 1});

    const manager = users.find((user) => user.type === UserBaseType.MANAGER)!;
    const user = users.find((user) => user.type === UserBaseType.USER)!;
    const {password, ...rest} = user;
    const {accessToken} = loginHelper(global.container, manager);

    await request(global.container.resolve("app"))
    .get(`/api/users/${user.id}/details`)
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200)
    .then((res) => {
        expect(res.body).to.be.deep.equal(rest);
    });
  });
  it("gets user details with note by manager", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve('userBaseRepository');
    const userNoteRepository: Repository<UserNoteModel> = global.container.resolve('userNoteRepository');
    const {users} = await seedApplication(global.container, {usersAmount: 1});

    const manager = users.find((user) => user.type === UserBaseType.MANAGER)!;
    const user = users.find((user) => user.type === UserBaseType.USER)!;

    const userNote = UserNoteModel.create({
        id: uuid(),
        content: 'abc'
    });
    user.userNote = userNote;

    await userNoteRepository.save(userNote);
    await userBaseRepository.save(user);

    const {password, ...rest} = user;
    const {accessToken} = loginHelper(global.container, manager);

    await request(global.container.resolve("app"))
    .get(`/api/users/${user.id}/details`)
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200)
    .then((res) => {
        expect(res.body).to.be.deep.equal(rest);
    });
  });
});
