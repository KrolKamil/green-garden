import {v4 as uuid} from 'uuid';
import { CommandHandler } from "../../../../shared/command-bus";
import { PUBLISH_NOTICE_COMMAND_TYPE, PublishNoticeCommand } from "../commands/publish-notice.command";
import { EventDispatcher } from "../../../../shared/event-dispatcher";
import PublishNoticeEvent from "../events/publish-notice.event";
import { Repository } from "typeorm";
import { NoticeModel } from "../models/notice.model";
import { UserBaseRepository } from "../../users/repositories/user-base.repository";


export interface PublishNoticeHandlerDependencies {
  noticeRepository: Repository<NoticeModel>;
  eventDispatcher: EventDispatcher;
}

export default class PublishNoticeHandler implements CommandHandler<PublishNoticeCommand> {
  public commandType: string = PUBLISH_NOTICE_COMMAND_TYPE;
  
  constructor(private dependencies: PublishNoticeHandlerDependencies) {}

  async execute(command: PublishNoticeCommand) {
    const {noticeRepository} = this.dependencies;
    const {title, content, type, creatorDTO } = command.payload;
    console.log(command.payload);
    await noticeRepository.save(NoticeModel.create({
      id: uuid(),
      title,
      content,
      type,
      creator: creatorDTO.id
    }));
    
    await this.dependencies.eventDispatcher.dispatch(new PublishNoticeEvent(command))
    return {
      result: command
    }
  };
}
