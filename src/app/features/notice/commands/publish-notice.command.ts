import { Command } from "../../../../shared/command-bus";
import { NoticeType } from "../models/notice.model";
import { UserBaseDTO } from "../../users/models/user-base.dto";

export const PUBLISH_NOTICE_COMMAND_TYPE = "notice/PUBLISH_NOTICE";

export interface PublishNoticeCommandPayload {
  title: string;
  content: string;
  type: NoticeType;
  creatorDTO: UserBaseDTO;
}

export class PublishNoticeCommand implements Command<PublishNoticeCommandPayload> {
  public type: string = PUBLISH_NOTICE_COMMAND_TYPE;

  constructor(public payload: PublishNoticeCommandPayload) {}
}
