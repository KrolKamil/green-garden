import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { Repository } from "typeorm";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { PendingUserModel } from "../../src/app/features/users/models/pending-user.model";
import { HttpError } from "../../src/errors/http.error";

describe("/users/register integration", () => {
  it("registers a user", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");

    const email = "stefan.banach@gmail.com";
    const pendingUser = await pendingUserRepository.save(
      PendingUserModel.create({
        id: uuid(),
        email,
        type: UserBaseType.USER,
      }),
    );

    await request(global.container.resolve("app"))
      .post("/api/users/register")
      .send({
        userId: pendingUser.id,
        password: "123456",
        name: "Stefan",
        surname: "Banach",
        phone: "123456",
      })
      .expect(200);

    const pendingUsersAmount = await pendingUserRepository.count();
    expect(pendingUsersAmount).to.be.equal(0);
    const newUser = await userBaseRepository.findOne({ email });
    expect(newUser).to.not.be.equal(undefined);
  });
  it("resgisters a manager", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");

    const email = "test@test.com";
    const pendingUser = await pendingUserRepository.save(
      PendingUserModel.create({
        id: uuid(),
        email,
        type: UserBaseType.MANAGER,
      }),
    );

    await request(global.container.resolve("app"))
      .post("/api/users/register")
      .send({
        userId: pendingUser.id,
        password: "123456",
        name: "test name",
        surname: "test surname",
        phone: "123",
      })
      .expect(200);

    const pendingUsersAmount = await pendingUserRepository.count();
    expect(pendingUsersAmount).to.be.equal(0);
    const newUser = await userBaseRepository.findOne({ email });
    expect(newUser).to.not.be.equal(undefined);
  });
  it("rejects registration on invalid userId", async () => {
    request(global.container.resolve("app"))
      .post("/api/users/register")
      .send({
        userId: "123456",
        password: "123456",
        name: "test name",
        surname: "test surname",
      })
      .expect(400)
      .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
      });
  });
});
