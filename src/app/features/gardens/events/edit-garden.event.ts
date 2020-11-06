import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { EditGardenCommandPayload } from "../commands/edit-garden.command";

export default class EditGardenEvent implements Event {
    static eventName: string = "EditGarden";
    public payload: Command<EditGardenCommandPayload>;
    
    get name() {
        return EditGardenEvent.eventName;
    }

    public constructor(command: Command<EditGardenCommandPayload>) {
        this.payload = command;
    }
  }