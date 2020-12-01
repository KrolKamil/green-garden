import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { getManager } from "typeorm";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { UserNoteModel } from "../../src/app/features/users/models/user-note.model";

describe("/users/list integration", () => {
  it("return list of users", async () => {
    const usersAmount = 50;
    const { users } = await seedApplication(global.container, {
      usersAmount,
    });

    const user = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, user);

    return request(global.container.resolve("app"))
      .get("/api/users/list")
      .set("Authorization", `Bearer ${accessToken}`)
      .then(async (res) => {
        expect(res.body.length).to.be.equal(usersAmount);
        const expectedUser = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
        delete expectedUser.password;
        expect(res.body[0]).to.be.deep.equal(JSON.parse(JSON.stringify({ ...expectedUser, containsNote: false })));
      });
  });
  it("returns list of users with information about assigned note to one of users", async () => {
    const { users } = await seedApplication(global.container, {
      usersAmount: 1,
    });

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;

    const userNote = UserNoteModel.create({
      id: uuid(),
      content: "test",
    });
    user.userNote = userNote;

    await getManager().transaction(async (transaction) => {
      await transaction.save(userNote);
      await transaction.save(user);
    });

    const { accessToken } = loginHelper(global.container, manager);

    return request(global.container.resolve("app"))
      .get("/api/users/list")
      .set("Authorization", `Bearer ${accessToken}`)
      .then(async (res) => {
        delete user.password;
        delete user.userNote;
        expect(res.body[0]).to.be.deep.equal(JSON.parse(JSON.stringify({ ...user, containsNote: true })));
      });
  });
});
