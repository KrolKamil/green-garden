import { Command } from "../../../../shared/command-bus";

export const SET_NOTE_COMMAND_TYPE = "users/SET_NOTE";

export interface SetNoteCommandPayload {
  userId: string;
  content: string;
}

export class SetNoteCommand implements Command<SetNoteCommandPayload> {
  public type: string = SET_NOTE_COMMAND_TYPE;

  constructor(public payload: SetNoteCommandPayload) {}
}
