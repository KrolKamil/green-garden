import { CommandHandler } from "../../../../shared/command-bus";
import { DELETE_NOTICE_COMMAND_TYPE, DeleteNoticeCommand } from "../commands/delete-notice.command";
import { Repository } from "typeorm";
import { NoticeModel } from "../models/notice.model";
import { HttpError } from "../../../../../src/errors/http.error";
import { BAD_REQUEST } from "http-status-codes";


export interface DeleteNoticeHandlerDependencies {
  noticeRepository: Repository<NoticeModel>
}

export default class DeleteNoticeHandler implements CommandHandler<DeleteNoticeCommand> {
  public commandType: string = DELETE_NOTICE_COMMAND_TYPE;
  
  constructor(private dependencies: DeleteNoticeHandlerDependencies) {}

  async execute(command: DeleteNoticeCommand) {
    const {noticeRepository} = this.dependencies;
    const {noticeId} = command.payload;

    const deleteResult = await noticeRepository.delete(noticeId);
    if(deleteResult.affected === 0){
      throw new HttpError("Not found", BAD_REQUEST)
    }
    return {}
  };
}
