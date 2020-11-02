import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { UpdateCommandPayload } from "../commands/update.command";

export default class UpdateEvent implements Event {
  static eventName: string = "Update";

  public payload: Command<UpdateCommandPayload>;

  get name() {
    return UpdateEvent.eventName;
  }

  public constructor(command: Command<UpdateCommandPayload>) {
    this.payload = command;
  }
}
