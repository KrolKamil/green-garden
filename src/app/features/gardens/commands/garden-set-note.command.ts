import { Command } from "../../../../shared/command-bus";

export const GARDEN_SET_NOTE_COMMAND_TYPE = "gardens/GARDEN_SET_NOTE";

export interface GardenSetNoteCommandPayload {
  gardenId: string;
  content: string;
}

export class GardenSetNoteCommand implements Command<GardenSetNoteCommandPayload> {
  public type: string = GARDEN_SET_NOTE_COMMAND_TYPE;

  constructor(public payload: GardenSetNoteCommandPayload) {}
}
