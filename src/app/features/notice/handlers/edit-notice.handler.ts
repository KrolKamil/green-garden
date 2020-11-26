import { Repository } from "typeorm";
import { NOT_FOUND } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { EDIT_NOTICE_COMMAND_TYPE, EditNoticeCommand } from "../commands/edit-notice.command";
import { NoticeModel } from "../models/notice.model";
import { HttpError } from "../../../../errors/http.error";

export interface EditNoticeHandlerDependencies {
  noticeRepository: Repository<NoticeModel>;
}

export default class EditNoticeHandler implements CommandHandler<EditNoticeCommand> {
  public commandType: string = EDIT_NOTICE_COMMAND_TYPE;

  constructor(private dependencies: EditNoticeHandlerDependencies) {}

  async execute(command: EditNoticeCommand) {
    const { noticeRepository } = this.dependencies;
    const { noticeId, title, content, creatorDTO } = command.payload;

    const notice = await noticeRepository.findOne(noticeId);
    if (!notice) {
      throw new HttpError("Not found", NOT_FOUND);
    }

    if (title) {
      notice.title = title;
    }

    if (content) {
      notice.content = content;
    }

    notice.creator = creatorDTO.id;

    await noticeRepository.save(notice);

    return {};
  }
}
