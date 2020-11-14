// import { expect } from "chai";
// import "mocha";
// import * as request from "supertest";
// import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
// import { seedApplication } from "../seed/seed-application";
// import { assignGardenHelper } from "../../tests/helpers/assign-garden.helper";
// import { unassignGardenHelper } from "../../tests/helpers/unassign-garden.helper";

// describe("/gardens/my-gardens integration", () => {
//   it("returns list of user presently assigned gardens", async () => {
//     const { users, gardens } = await seedApplication(global.container, { usersAmount: 2, gardensAmount: 3 });

//     const targetUsers = users.filter((user) => user.type === UserBaseType.USER);
//     const userTarget = targetUsers[0];
//     const userOther = targetUsers[1];

//     await assignGardenHelper(global.container, userTarget, gardens![0]);
//     await unassignGardenHelper(global.container, userTarget, gardens![0]);
//     await assignGardenHelper(global.container, userTarget, gardens![1]);
//     await assignGardenHelper(global.container, userOther, gardens![2]);

//     await request(global.container.resolve("app"))
//       .post(`/api/gardens/edit-garden`)
//       .send(payload)
//       .set("Authorization", `Bearer ${accessToken}`)
//       .expect(200);
//   });
// });
