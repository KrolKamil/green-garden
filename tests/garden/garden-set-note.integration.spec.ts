import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { GardenRepository } from "../../src/app/features/users/repositories/garden.repository";

describe("/gardens/garden-set-note integration", () => {
  it("sets garden note", async () => {
    const content = "abc";
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const garden = gardens![0];

    const { accessToken } = loginHelper(global.container, manager);

    await request(global.container.resolve("app"))
      .post("/api/gardens/garden-set-note")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        gardenId: garden.id,
        content,
      })
      .expect(200);

    const gardenRepository: GardenRepository = global.container.resolve("gardenRepository");
    const gardenWithNote = await gardenRepository.findOneOrFail({
      where: { id: garden.id },
      relations: ["gardenNote"],
    });

    expect(gardenWithNote?.gardenNote?.content).to.be.equal(content);
  });
  it("updates garden note", async () => {
    const content = "abc";

    const updatedContent = "xyz";
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 1 });

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const garden = gardens![0];

    const { accessToken } = loginHelper(global.container, manager);

    await request(global.container.resolve("app"))
      .post("/api/gardens/garden-set-note")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        gardenId: garden.id,
        content,
      })
      .expect(200);

    await request(global.container.resolve("app"))
      .post("/api/gardens/garden-set-note")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        gardenId: garden.id,
        content: updatedContent,
      })
      .expect(200);

    const gardenRepository: GardenRepository = global.container.resolve("gardenRepository");
    const gardenWithNote = await gardenRepository.findOneOrFail({
      where: { id: garden.id },
      relations: ["gardenNote"],
    });

    expect(gardenWithNote?.gardenNote?.content).to.be.equal(updatedContent);
  });
});
