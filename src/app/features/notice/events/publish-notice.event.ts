import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { PublishNoticeCommandPayload } from "../commands/publish-notice.command";

export default class PublishNoticeEvent implements Event {
    static eventName: string = "PublishNotice";
    public payload: Command<PublishNoticeCommandPayload>;
    
    get name() {
        return PublishNoticeEvent.eventName;
    }

    public constructor(command: Command<PublishNoticeCommandPayload>) {
        this.payload = command;
    }
  }