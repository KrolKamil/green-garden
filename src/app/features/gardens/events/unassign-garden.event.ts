import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { UnassignGardenCommandPayload } from "../commands/unassign-garden.command";

export default class UnassignGardenEvent implements Event {
    static eventName: string = "UnassignGarden";
    public payload: Command<UnassignGardenCommandPayload>;
    
    get name() {
        return UnassignGardenEvent.eventName;
    }

    public constructor(command: Command<UnassignGardenCommandPayload>) {
        this.payload = command;
    }
  }