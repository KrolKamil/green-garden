import { expect, use } from "chai";
import "mocha";
import * as chaiAsPromised from "chai-as-promised";

import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { GardenRepository } from "../../src/app/features/users/repositories/garden.repository";
import { HttpError } from "../../src/errors/http.error";

use(chaiAsPromised);

describe("/gardens/create-garden integration", () => {
  it("creates new garden instance", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const gardenRepository: GardenRepository = global.container.resolve("gardenRepository");

    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const payload = {
      publicId: "abc",
      surfaceInSquareMeters: 10,
      includeWater: true,
      includeElectricity: false,
    };

    await request(global.container.resolve("app"))
      .post("/api/gardens/create-garden")
      .send(payload)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    const {
      publicId,
      surfaceInSquareMeters,
      includeWater,
      includeElectricity,
      includeGas,
    } = await gardenRepository.findOneOrFail();

    expect(publicId).to.be.equal(payload.publicId);
    expect(surfaceInSquareMeters).to.be.equal(payload.surfaceInSquareMeters);
    expect(includeWater).to.be.equal(payload.includeWater);
    expect(includeElectricity).to.be.equal(payload.includeElectricity);
    expect(includeGas).to.be.equal(false);
  });
  it("rejects creation of new garden instance if publicId is taken", async () => {
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const payload = {
      publicId: "abc",
      surfaceInSquareMeters: 10,
      includeWater: true,
      includeElectricity: false,
    };

    await request(global.container.resolve("app"))
      .post("/api/gardens/create-garden")
      .send(payload)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    request(global.container.resolve("app"))
      .post("/api/gardens/create-garden")
      .send(payload)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400)
      .then((res) => {
        expect(res).to.be.instanceOf(HttpError);
      });
  });
});
