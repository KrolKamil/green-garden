import { Command } from "../../../../shared/command-bus";

export const EDIT_GARDEN_COMMAND_TYPE = "gardens/EDIT_GARDEN";

export interface EditGardenCommandPayload {
  id: string;
  publicId: string;
  surfaceInSquareMeters: number;
  includeWater?: boolean;
  includeElectricity?: boolean;
  includeGas?: boolean;
}

export class EditGardenCommand implements Command<EditGardenCommandPayload> {
  public type: string = EDIT_GARDEN_COMMAND_TYPE;

  constructor(public payload: EditGardenCommandPayload) {}
}
