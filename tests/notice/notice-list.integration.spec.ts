import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { Repository } from "typeorm";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { NoticeModel, NoticeType } from "../../src/app/features/notice/models/notice.model";

describe("/notice/notice-list integration", () => {
  it("gets notice list", async () => {
    const noticeRepository: Repository<NoticeModel> = global.container.resolve("noticeRepository");
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const amount = 10;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < amount; i++) {
      // eslint-disable-next-line no-await-in-loop
      await noticeRepository.save(
        NoticeModel.create({
          id: uuid(),
          title: `Title nr: ${i}`,
          content: `Title content: ${i}`,
          type: NoticeType.NORMAL,
          creator: manager,
        }),
      );
    }

    await request(global.container.resolve("app"))
      .get("/api/notice/notice-list")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).to.be.equal(amount);
        const createdTimes = res.body.map((notice: NoticeModel) => notice.createdAt);
        const createdTimesSorted = [...createdTimes].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        expect(createdTimes).to.eql(createdTimesSorted);
      });
  });
});
