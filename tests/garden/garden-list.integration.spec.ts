import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { AssignedGardensRepository } from "../../src/app/features/users/repositories/assigned-gardens.repository";
import { AssignedGardensModel } from "../../src/app/features/gardens/models/assigned-gardens.model";

describe("/gardens/garden-list integration", () => {
  it("returns empty array when system does not contain any garden", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1 });

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    request(global.container.resolve("app"))
      .post("/api/gardens/garden-list")
      .send({})
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).to.be.equal(0);
      });
  });
  it("returns garden list and each gardens is free", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 10 });

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    await request(global.container.resolve("app"))
      .get("/api/gardens/garden-list")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).to.be.equal(10);
        const firstGarden = res.body[0];
        expect(firstGarden).to.haveOwnProperty("id");
        expect(firstGarden).to.haveOwnProperty("publicId");
        expect(firstGarden).to.haveOwnProperty("surfaceInSquareMeters");
        expect(firstGarden).to.haveOwnProperty("includeWater");
        expect(firstGarden).to.haveOwnProperty("includeElectricity");
        expect(firstGarden).to.haveOwnProperty("includeGas");
        expect(firstGarden).to.haveOwnProperty("isOccupied", false);
      });
  });
  it("returns garden list with one assigned garden", async () => {
    const assignedGardensRepository: AssignedGardensRepository = global.container.resolve("assignedGardensRepository");
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 10 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const garden = gardens![0];
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    await assignedGardensRepository.save(
      AssignedGardensModel.create({
        id: uuid(),
        userBase: user,
        garden,
        assignedAt: new Date(),
      }),
    );

    await request(global.container.resolve("app"))
      .get("/api/gardens/garden-list")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).to.be.equal(10);
        const firstGarden = res.body.find((singleUser: any) => singleUser.isOccupied);
        expect(firstGarden).to.haveOwnProperty("id");
        expect(firstGarden).to.haveOwnProperty("publicId");
        expect(firstGarden).to.haveOwnProperty("surfaceInSquareMeters");
        expect(firstGarden).to.haveOwnProperty("includeWater");
        expect(firstGarden).to.haveOwnProperty("includeElectricity");
        expect(firstGarden).to.haveOwnProperty("includeGas");
        expect(firstGarden).to.haveOwnProperty("isOccupied", true);
      });
  });
});
