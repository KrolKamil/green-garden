import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { DeleteNoticeCommandPayload } from "../commands/delete-notice.command";

export default class DeleteNoticeEvent implements Event {
  static eventName: string = "DeleteNotice";

  public payload: Command<DeleteNoticeCommandPayload>;

  get name() {
    return DeleteNoticeEvent.eventName;
  }

  public constructor(command: Command<DeleteNoticeCommandPayload>) {
    this.payload = command;
  }
}
