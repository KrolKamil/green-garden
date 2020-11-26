import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { Repository } from "typeorm";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { NoticeModel, NoticeType } from "../../src/app/features/notice/models/notice.model";

describe("/notice/delete-notice integration", () => {
  it("deletes notice", async () => {
    const noticeRepository: Repository<NoticeModel> = global.container.resolve("noticeRepository");
    const { users } = await seedApplication(global.container, { usersAmount: 1 });
    const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
    const { accessToken } = loginHelper(global.container, manager);

    const notice = await noticeRepository.save(
      NoticeModel.create({
        id: uuid(),
        title: "test title",
        content: "test content",
        type: NoticeType.NORMAL,
        creator: manager,
      }),
    );

    await request(global.container.resolve("app"))
      .post("/api/notice/delete-notice")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        noticeId: notice.id,
      })
      .expect(200);

    const notFoundNotice = await noticeRepository.findOne(notice.id);
    expect(notFoundNotice).to.be.equal(undefined);
  });
});
