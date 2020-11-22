import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { Repository } from "typeorm";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { PendingUserModel } from "../../src/app/features/users/models/pending-user.model";
import { HttpError } from "../../src/errors/http.error";

describe("/users/register integration", () => {
  it("registers user", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const email = "test@test.com";
    const pendingUser = await pendingUserRepository.save(
      PendingUserModel.create({
        id: uuid(),
        email,
        type: UserBaseType.USER,
      }),
    );

    await request(global.container.resolve("app"))
      .post("/api/users/register")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        userId: pendingUser.id,
        password: "123456",
      })
      .expect(200);

    const pendingUsersAmount = await pendingUserRepository.count();
    expect(pendingUsersAmount).to.be.equal(0);
    const newUser = await userBaseRepository.findOne({ email });
    expect(newUser).to.not.be.equal(undefined);
  });
  it("resgister manager", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

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
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        userId: pendingUser.id,
        password: "123456",
      })
      .expect(200);

    const pendingUsersAmount = await pendingUserRepository.count();
    expect(pendingUsersAmount).to.be.equal(0);
    const newUser = await userBaseRepository.findOne({ email });
    expect(newUser).to.not.be.equal(undefined);
  });
  it("rejects registration on invalid userId", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    request(global.container.resolve("app"))
      .post("/api/users/register")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        userId: "123456",
        password: "123456",
      })
      .expect(400)
      .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
      });
  });
});
