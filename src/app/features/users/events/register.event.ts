import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { RegisterCommandPayload } from "../commands/register.command";

export default class RegisterEvent implements Event {
  static eventName: string = "Register";

  public payload: Command<RegisterCommandPayload>;

  get name() {
    return RegisterEvent.eventName;
  }

  public constructor(command: Command<RegisterCommandPayload>) {
    this.payload = command;
  }
}
