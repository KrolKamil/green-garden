import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";

describe("/users/set-active integration", () => {
  it("sets user active status to false", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1 });

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;

    const { accessToken } = loginHelper(global.container, manager);

    await request(global.container.resolve("app"))
      .post("/api/users/set-active")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        userId: user.id,
        active: false,
      })
      .expect(200);

    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const updatedUser = await userBaseRepository.findOneOrFail(user.id);
    expect(updatedUser.active).to.be.equal(false);
  });
});
