import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { Repository } from "typeorm";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { HttpError } from "../../src/errors/http.error";
import { PendingUserModel } from "../../src/app/features/users/models/pending-user.model";

describe("/users/invite-user integration", () => {
  it("thows error when email is occupied", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const { accessToken } = loginHelper(global.container, manager);

    request(global.container.resolve("app"))
      .post("/api/users/invite-user")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        email: user.email,
      })
      .expect(400)
      .then(async (res) => {
        expect(res).to.be.instanceOf(HttpError);
      });
  });
  it("creates pending user and sends email", async () => {
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const email = "new.user@test.com";
    await request(global.container.resolve("app"))
      .post("/api/users/invite-user")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        email,
      })
      .expect(200)
      .then(async () => {
        const pendingUser = await pendingUserRepository.findOne({});
        expect(pendingUser?.email).to.be.equal(email);
        expect(pendingUser?.type).to.be.equal(UserBaseType.USER);
      });
  });
  it("resends email", async () => {
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const email = "new.user@test.com";
    await request(global.container.resolve("app"))
      .post("/api/users/invite-user")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        email: "new.user@test.com",
      })
      .expect(200)
      .then(async () => {
        const pendingUser = await pendingUserRepository.findOne({});
        expect(pendingUser?.email).to.be.equal(email);
        expect(pendingUser?.type).to.be.equal(UserBaseType.USER);
      });

    await request(global.container.resolve("app"))
      .post("/api/users/invite-user")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        email: "new.user@test.com",
      })
      .expect(200)
      .then(async () => {
        const pendingUserAmount = await pendingUserRepository.count();
        expect(pendingUserAmount).to.be.equal(1);
      });
  });
});
