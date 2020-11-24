import { Command } from "../../../../shared/command-bus";

export const PUBLISH_NOTICE_COMMAND_TYPE = "notice/PUBLISH_NOTICE";

export interface PublishNoticeCommandPayload {}

export class PublishNoticeCommand implements Command<PublishNoticeCommandPayload> {
  public type: string = PUBLISH_NOTICE_COMMAND_TYPE;

  constructor(public payload: PublishNoticeCommandPayload) {}
}
