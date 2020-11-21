import { Command } from "../../../../shared/command-bus";

export const CREATE_GARDEN_COMMAND_TYPE = "gardens/CREATE_GARDEN";

export interface CreateGardenCommandPayload {
  publicId: string;
  surfaceInSquareMeters: number;
  includeWater: boolean;
  includeElectricity: boolean;
  includeGas: boolean;
}

export class CreateGardenCommand implements Command<CreateGardenCommandPayload> {
  public type: string = CREATE_GARDEN_COMMAND_TYPE;

  constructor(public payload: CreateGardenCommandPayload) {}
}
