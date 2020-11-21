import { Command } from "../../../../shared/command-bus";

export const UNASSIGN_GARDEN_COMMAND_TYPE = "gardens/UNASSIGN_GARDEN";

export interface UnassignGardenCommandPayload {
  userId: string;
  gardenId: string;
}

export class UnassignGardenCommand implements Command<UnassignGardenCommandPayload> {
  public type: string = UNASSIGN_GARDEN_COMMAND_TYPE;

  constructor(public payload: UnassignGardenCommandPayload) {}
}
