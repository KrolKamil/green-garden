import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";

describe("/users/register-user integration", () => {
  it("register user", async () => {
    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");

    await request(global.container.resolve("app")).post("/api/users/register-user").send({
      email: "example-email+user@test.com",
      password: "123456",
    });

    const user = await userBaseRepository.findOne({ type: UserBaseType.USER });
    // eslint-disable-next-line
    expect(user?.active).to.be.equal(true);
    expect(user).to.not.be.undefined;
  });
});
