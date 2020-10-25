import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { RegisterUserCommandPayload } from "../commands/register-user.command";

export default class RegisterUserEvent implements Event {
  static eventName: string = "RegisterUser";

  public payload: Command<RegisterUserCommandPayload>;

  get name() {
    return RegisterUserEvent.eventName;
  }

  public constructor(command: Command<RegisterUserCommandPayload>) {
    this.payload = command;
  }
}
