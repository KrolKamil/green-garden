import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { AssignGardenCommandPayload } from "../commands/assign-garden.command";

export default class AssignGardenEvent implements Event {
  static eventName: string = "AssignGarden";

  public payload: Command<AssignGardenCommandPayload>;

  get name() {
    return AssignGardenEvent.eventName;
  }

  public constructor(command: Command<AssignGardenCommandPayload>) {
    this.payload = command;
  }
}
