import { v4 as uuid } from "uuid";
import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { Repository } from "typeorm";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { NoticeModel, NoticeType } from "../../src/app/features/notice/models/notice.model";

describe("/notice/edit-notice integration", () => {
  it("edits notice", async () => {
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

    const payload = {
      noticeId: notice.id,
      title: "new title",
      content: "new content",
    };

    await request(global.container.resolve("app"))
      .post("/api/notice/edit-notice")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(payload)
      .expect(200);

    const updatedNotice = await noticeRepository.findOneOrFail(notice.id);
    expect(updatedNotice.title).to.equal(payload.title);
    expect(updatedNotice.content).to.equal(payload.content);
  });
});
