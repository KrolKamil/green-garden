import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { assignGardenHelper } from "../helpers/assign-garden.helper";
import { unassignGardenHelper } from "../helpers/unassign-garden.helper";

describe("/users/:userId/assigned-gardens integration", () => {
  it("gets user presently assigned gardens", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 3 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const { accessToken } = loginHelper(global.container, manager);

    await assignGardenHelper(global.container, user, gardens![0]);
    await unassignGardenHelper(global.container, user, gardens![0]);
    await assignGardenHelper(global.container, user, gardens![1]);

    await request(global.container.resolve("app"))
      .get(`/api/users/${user.id}/assigned-gardens`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body[0].assignedGardens[0].id).to.be.not.equal(undefined);
        expect(res.body[0].assignedGardens[0].unassignedAt).to.be.equal(null);
        // eslint-disable-next-line
        delete res.body[0].assignedGardens;
        expect(res.body[0]).to.be.deep.equal(JSON.parse(JSON.stringify(gardens![1])));
      });
  });
  it("gets user historically assigned gardens", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 1, gardensAmount: 3 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    const { accessToken } = loginHelper(global.container, manager);

    await assignGardenHelper(global.container, user, gardens![0]);
    await unassignGardenHelper(global.container, user, gardens![0]);
    await assignGardenHelper(global.container, user, gardens![1]);

    await request(global.container.resolve("app"))
      .get(`/api/users/${user.id}/assigned-gardens?filter=historical`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body[0].assignedGardens[0].id).to.be.not.equal(undefined);
        expect(res.body[0].assignedGardens[0].unassignedAt).to.be.not.equal(null);
        // eslint-disable-next-line
        delete res.body[0].assignedGardens;
        expect(res.body[1].assignedGardens[0].id).to.be.not.equal(undefined);
        expect(res.body[1].assignedGardens[0].unassignedAt).to.be.equal(null);
        // eslint-disable-next-line
        delete res.body[1].assignedGardens;
        expect(res.body).to.be.deep.equal([
          JSON.parse(JSON.stringify(gardens![0])),
          JSON.parse(JSON.stringify(gardens![1])),
        ]);
      });
  });
});
