import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { assignGardenHelper } from "../../tests/helpers/assign-garden.helper";
import { unassignGardenHelper } from "../../tests/helpers/unassign-garden.helper";
import { loginHelper } from "../../tests/helpers/login.helper";

describe("/gardens/my-gardens integration", () => {
  it("returns list of user presently assigned gardens", async () => {
    const { users, gardens } = await seedApplication(global.container, { usersAmount: 2, gardensAmount: 3 });
    
    const targetUsers = users.filter((user) => user.type === UserBaseType.USER);
    const userTarget = targetUsers[0];
    const userOther = targetUsers[1];
    
    // one garden never assigned
    // one historial assigned garden
    await assignGardenHelper(global.container, userTarget, gardens![0]);
    await unassignGardenHelper(global.container, userTarget, gardens![0]);
    // one presently assigned garden
    await assignGardenHelper(global.container, userTarget, gardens![1]);
    // one presently assigned garden to someone else
    await assignGardenHelper(global.container, userOther, gardens![2]);
    
    const {active, ...rest} = gardens![1];
    const { accessToken } = loginHelper(global.container, userTarget);
    await request(global.container.resolve("app"))
      .get(`/api/gardens/my-gardens`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
          expect(res.body.length).to.be.equal(1);
          expect(res.body[0]).to.be.deep.equal(rest);
      })
  });
});
