import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { GardenSetActiveCommandPayload } from "../commands/garden-set-active.command";

export default class GardenSetActiveEvent implements Event {
  static eventName: string = "GardenSetActive";

  public payload: Command<GardenSetActiveCommandPayload>;

  get name() {
    return GardenSetActiveEvent.eventName;
  }

  public constructor(command: Command<GardenSetActiveCommandPayload>) {
    this.payload = command;
  }
}
