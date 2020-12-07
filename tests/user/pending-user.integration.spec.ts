import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { Repository } from "typeorm";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { HttpError } from "../../src/errors/http.error";
import { PendingUserModel } from "../../src/app/features/users/models/pending-user.model";

describe("/users/pending-user integration", () => {
  it("thows error when pending user does not exist", async () => {
    await seedApplication(global.container, { usersAmount: 1 });

    request(global.container.resolve("app"))
      .get("/api/users/123/pending-user")
      .expect(400)
      .then(async (res) => {
        expect(res).to.be.instanceOf(HttpError);
      });
  });

  it("returns pending user", async () => {
    const pendingUserRepository: Repository<PendingUserModel> = global.container.resolve("pendingUserRepository");
    await seedApplication(global.container, { usersAmount: 1 });

    const pendingUser = await pendingUserRepository.save(
      PendingUserModel.create({
        id: uuid(),
        email: "test@test.com",
        type: UserBaseType.USER,
      }),
    );

    await request(global.container.resolve("app"))
      .get(`/api/users/${pendingUser.id}/pending-user`)
      .expect(200)
      .then(async (res) => {
        expect(res.body).to.be.deep.equal(JSON.parse(JSON.stringify(pendingUser)));
      });
  });
});
