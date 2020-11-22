import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { Repository } from "typeorm";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { HttpError } from "../../src/errors/http.error";
import { PendingUserModel } from "../../src/app/features/users/models/pending-user.model";

describe("/users/pending-user integration", () => {
  it("thows error when pending user does not exist", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    request(global.container.resolve("app"))
      .get("/api/users/123/pending-user")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400)
      .then(async (res) => {
        expect(res).to.be.instanceOf(HttpError);
      });
  });

  it("returns pending user", async () => {
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const pendingUser = await pendingUserRepository.save(
      PendingUserModel.create({
        id: uuid(),
        email: "test@test.com",
        type: UserBaseType.USER,
      }),
    );

    await request(global.container.resolve("app"))
      .get(`/api/users/${pendingUser.id}/pending-user`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body).to.be.deep.equal(JSON.parse(JSON.stringify(pendingUser)));
      });
  });
});
