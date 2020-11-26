import { Command } from "../../../../shared/command-bus";

export const DELETE_NOTICE_COMMAND_TYPE = "notice/DELETE_NOTICE";

export interface DeleteNoticeCommandPayload {
  noticeId: string;
}

export class DeleteNoticeCommand implements Command<DeleteNoticeCommandPayload> {
  public type: string = DELETE_NOTICE_COMMAND_TYPE;

  constructor(public payload: DeleteNoticeCommandPayload) {}
}
