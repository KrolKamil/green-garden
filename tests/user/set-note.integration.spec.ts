import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseRepository } from "../../src/app/features/users/repositories/user-base.repository";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";

describe("/users/set-note integration", () => {
  it("sets user note", async () => {
    const content = "abc";
    const { users } = await seedApplication(global.container, { usersAmount: 1 });

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;

    const { accessToken } = loginHelper(global.container, manager);

    await request(global.container.resolve("app"))
      .post("/api/users/set-note")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        userId: user.id,
        content,
      })
      .expect(200);

    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const userWithNote = await userBaseRepository.findOneOrFail({
      where: { id: user.id },
      relations: ["userNote"],
    });

    expect(userWithNote?.userNote?.content).to.be.equal(content);
  });
  it("updates user note", async () => {
    const content = "abc";
    const updatedContent = "xyz";
    const { users } = await seedApplication(global.container, { usersAmount: 1 });

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;

    const { accessToken } = loginHelper(global.container, manager);

    await request(global.container.resolve("app"))
      .post("/api/users/set-note")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        userId: user.id,
        content,
      })
      .expect(200);

    await request(global.container.resolve("app"))
      .post("/api/users/set-note")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        userId: user.id,
        content: updatedContent,
      })
      .expect(200);

    const userBaseRepository: UserBaseRepository = global.container.resolve("userBaseRepository");
    const userWithNote = await userBaseRepository.findOneOrFail({
      where: { id: user.id },
      relations: ["userNote"],
    });

    expect(userWithNote?.userNote?.content).to.be.equal(updatedContent);
  });
});
