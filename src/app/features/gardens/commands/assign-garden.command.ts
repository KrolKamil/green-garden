import { Command } from "../../../../shared/command-bus";

export const ASSIGN_GARDEN_COMMAND_TYPE = "gardens/ASSIGN_GARDEN";

export interface AssignGardenCommandPayload {
  userId: string;
  gardenId: string;
}

export class AssignGardenCommand implements Command<AssignGardenCommandPayload> {
  public type: string = ASSIGN_GARDEN_COMMAND_TYPE;

  constructor(public payload: AssignGardenCommandPayload) {}
}
