import { Command } from "../../../../shared/command-bus";
import { UserBaseDTO } from "../../users/models/user-base.dto";

export const EDIT_NOTICE_COMMAND_TYPE = "notice/EDIT_NOTICE";

export interface EditNoticeCommandPayload {
  noticeId: string;
  title: string | null;
  content: string | null;
  creatorDTO: UserBaseDTO;
}

export class EditNoticeCommand implements Command<EditNoticeCommandPayload> {
  public type: string = EDIT_NOTICE_COMMAND_TYPE;

  constructor(public payload: EditNoticeCommandPayload) {}
}
