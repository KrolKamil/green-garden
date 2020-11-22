import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { InviteManagerCommandPayload } from "../commands/invite-manager.command";

export default class InviteManagerEvent implements Event {
  static eventName: string = "InviteManager";

  public payload: Command<InviteManagerCommandPayload>;

  get name() {
    return InviteManagerEvent.eventName;
  }

  public constructor(command: Command<InviteManagerCommandPayload>) {
    this.payload = command;
  }
}
