import { Command } from "../../../../shared/command-bus";

export const GARDEN_SET_ACTIVE_COMMAND_TYPE = "gardens/GARDEN_SET_ACTIVE";

export interface GardenSetActiveCommandPayload {
  gardenId: string;
  active: boolean;
}

export class GardenSetActiveCommand implements Command<GardenSetActiveCommandPayload> {
  public type: string = GARDEN_SET_ACTIVE_COMMAND_TYPE;

  constructor(public payload: GardenSetActiveCommandPayload) {}
}
