import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { assignGardenHelper } from "../helpers/assign-garden.helper";
import { unassignGardenHelper } from "../helpers/unassign-garden.helper";

describe("/gardens/:gardenId/assigned-user integration", () => {
  it("gets garden presently assigned user", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 2, gardensAmount: 3 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const user = users.find((singleUser) => singleUser.type === UserBaseType.USER)!;
    delete user.password;
    const { accessToken } = loginHelper(global.container, manager);

    await assignGardenHelper(global.container, user, gardens![0]);
    await unassignGardenHelper(global.container, user, gardens![0]);
    await assignGardenHelper(global.container, user, gardens![0]);

    await request(global.container.resolve("app"))
      .get(`/api/gardens/${gardens![0].id}/assigned-user`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body[0].assignedGardens[0].id).to.be.not.equal(undefined);
        expect(res.body[0].assignedGardens[0].unassignedAt).to.be.equal(null);
        // eslint-disable-next-line
        delete res.body[0].assignedGardens;
        expect(res.body[0]).to.be.deep.equal(JSON.parse(JSON.stringify(user)));
      });
  });
  it("gets garden historically assigned users", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 2, gardensAmount: 3 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const [oldOnwer, newOwner] = users.filter((singleUser) => singleUser.type === UserBaseType.USER)!;

    delete oldOnwer.password;
    delete newOwner.password;

    await assignGardenHelper(global.container, oldOnwer, gardens![0]);
    await unassignGardenHelper(global.container, oldOnwer, gardens![0]);
    await assignGardenHelper(global.container, newOwner, gardens![0]);

    await request(global.container.resolve("app"))
      .get(`/api/gardens/${gardens![0].id}/assigned-user?filter=historical`)
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
        expect(res.body).to.be.deep.equal([JSON.parse(JSON.stringify(oldOnwer)), JSON.parse(JSON.stringify(newOwner))]);
      });
  });
});
