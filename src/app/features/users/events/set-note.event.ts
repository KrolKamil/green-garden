import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { SetNoteCommandPayload } from "../commands/set-note.command";

export default class SetNoteEvent implements Event {
  static eventName: string = "SetNote";

  public payload: Command<SetNoteCommandPayload>;

  get name() {
    return SetNoteEvent.eventName;
  }

  public constructor(command: Command<SetNoteCommandPayload>) {
    this.payload = command;
  }
}
