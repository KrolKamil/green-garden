import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { InviteUserCommandPayload } from "../commands/invite-user.command";

export default class InviteUserEvent implements Event {
  static eventName: string = "InviteUser";

  public payload: Command<InviteUserCommandPayload>;

  get name() {
    return InviteUserEvent.eventName;
  }

  public constructor(command: Command<InviteUserCommandPayload>) {
    this.payload = command;
  }
}
