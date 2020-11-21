import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { CreateGardenCommandPayload } from "../commands/create-garden.command";

export default class CreateGardenEvent implements Event {
  static eventName: string = "CreateGarden";

  public payload: Command<CreateGardenCommandPayload>;

  get name() {
    return CreateGardenEvent.eventName;
  }

  public constructor(command: Command<CreateGardenCommandPayload>) {
    this.payload = command;
  }
}
