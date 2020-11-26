import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { EditNoticeCommandPayload } from "../commands/edit-notice.command";

export default class EditNoticeEvent implements Event {
    static eventName: string = "EditNotice";
    public payload: Command<EditNoticeCommandPayload>;
    
    get name() {
        return EditNoticeEvent.eventName;
    }

    public constructor(command: Command<EditNoticeCommandPayload>) {
        this.payload = command;
    }
  }