import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { CommandHandler } from "../../../../shared/command-bus";
import { PUBLISH_NOTICE_COMMAND_TYPE, PublishNoticeCommand } from "../commands/publish-notice.command";
import { NoticeModel, NoticeType } from "../models/notice.model";
import { UserBaseRepository } from "../../users/repositories/user-base.repository";
import { UserBaseType } from "../../users/models/user-base.model";
import { MailService } from "../../../services/mail.service";

export interface PublishNoticeHandlerDependencies {
  noticeRepository: Repository<NoticeModel>;
  userBaseRepository: UserBaseRepository;
  mailService: MailService;
}

export default class PublishNoticeHandler implements CommandHandler<PublishNoticeCommand> {
  public commandType: string = PUBLISH_NOTICE_COMMAND_TYPE;

  constructor(private dependencies: PublishNoticeHandlerDependencies) {}

  async execute(command: PublishNoticeCommand) {
    const { noticeRepository } = this.dependencies;
    const { title, content, type, creatorDTO } = command.payload;
    await noticeRepository.save(
      NoticeModel.create({
        id: uuid(),
        title,
        content,
        type,
        creator: creatorDTO.id,
      }),
    );

    if (type === NoticeType.IMPORTANT) {
      await this.notifyUsersByMail(title);
    }
    return {};
  }

  private async notifyUsersByMail(title: string) {
    const { userBaseRepository, mailService } = this.dependencies;
    const activeUsers = await userBaseRepository.find({ active: true, type: UserBaseType.USER });
    await Promise.all(activeUsers.map((activeUser) => mailService.sendNoticeMail(activeUser.email, title)));
  }
}
