import { expect } from "chai";
import "mocha";
import * as request from "supertest";
import { UserBaseType } from "../../src/app/features/users/models/user-base.model";
import { seedApplication } from "../seed/seed-application";
import { loginHelper } from "../helpers/login.helper";
import { Repository } from "typeorm";
import { NoticeModel, NoticeType } from "../../src/app/features/notice/models/notice.model";

describe("/notice/publish-notice integration", () => {
    it("publish new notice", async () => {
        const noticeRepository: Repository<NoticeModel> = global.container.resolve('noticeRepository');
        const { users } = await seedApplication(global.container, { usersAmount: 1});
        const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
        const { accessToken } = loginHelper(global.container, manager);
        
        const payload = {
            title: "title",
            content: "content",
        }
        await request(global.container.resolve("app"))
        .post("/api/notice/publish-notice")
        .send(payload)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);

        const notice = await noticeRepository.findOneOrFail({relations: ['creator']});
        expect(notice.title).to.be.equal(payload.title);
        expect(notice.content).to.be.equal(payload.content);
        expect(notice.type).to.be.equal(NoticeType.NORMAL);
        delete manager.password;
        expect(notice.creator).to.be.deep.equal(manager);
    })
    it("publish new notice and sends mail to users where notice type is important", async () => {
        const noticeRepository: Repository<NoticeModel> = global.container.resolve('noticeRepository');
        const { users } = await seedApplication(global.container, { usersAmount: 10});
        const manager = users.find((singleUser) => singleUser.type === UserBaseType.MANAGER)!;
        const { accessToken } = loginHelper(global.container, manager);
        
        const payload = {
            title: "title",
            content: "content",
            type: NoticeType.IMPORTANT
        }
        await request(global.container.resolve("app"))
        .post("/api/notice/publish-notice")
        .send(payload)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);

        const notice = await noticeRepository.findOneOrFail({relations: ['creator']});
        expect(notice.title).to.be.equal(payload.title);
        expect(notice.content).to.be.equal(payload.content);
        expect(notice.type).to.be.equal(payload.type);
        delete manager.password;
        expect(notice.creator).to.be.deep.equal(manager);
    });
});
