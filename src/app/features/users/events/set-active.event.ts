import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { SetActiveCommandPayload } from "../commands/set-active.command";

export default class SetActiveEvent implements Event {
  static eventName: string = "SetActive";

  public payload: Command<SetActiveCommandPayload>;

  get name() {
    return SetActiveEvent.eventName;
  }

  public constructor(command: Command<SetActiveCommandPayload>) {
    this.payload = command;
  }
}
