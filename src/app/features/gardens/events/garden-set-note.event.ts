import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { GardenSetNoteCommandPayload } from "../commands/garden-set-note.command";

export default class GardenSetNoteEvent implements Event {
    static eventName: string = "GardenSetNote";
    public payload: Command<GardenSetNoteCommandPayload>;
    
    get name() {
        return GardenSetNoteEvent.eventName;
    }

    public constructor(command: Command<GardenSetNoteCommandPayload>) {
        this.payload = command;
    }
  }