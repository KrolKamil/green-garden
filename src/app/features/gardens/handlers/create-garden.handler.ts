import { v4 as uuid } from "uuid";
import { BAD_REQUEST } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { CREATE_GARDEN_COMMAND_TYPE, CreateGardenCommand } from "../commands/create-garden.command";
import { GardenRepository } from "../../users/repositories/garden.repository";
import { HttpError } from "../../../../errors/http.error";
import { GardenModel } from "../models/garden.model";

export interface CreateGardenHandlerDependencies {
  gardenRepository: GardenRepository;
}

export default class CreateGardenHandler implements CommandHandler<CreateGardenCommand> {
  public commandType: string = CREATE_GARDEN_COMMAND_TYPE;

  constructor(private dependencies: CreateGardenHandlerDependencies) {}

  async execute(command: CreateGardenCommand) {
    const { gardenRepository } = this.dependencies;
    const { publicId, surfaceInSquareMeters, includeWater, includeElectricity, includeGas } = command.payload;
    const existingGarden = await gardenRepository.findOne({ publicId });

    if (existingGarden) {
      throw new HttpError("Garden publicId is taken", BAD_REQUEST);
    }

    const garden = GardenModel.create({
      id: uuid(),
      publicId,
      surfaceInSquareMeters,
      includeElectricity,
      includeGas,
      includeWater,
    });

    await gardenRepository.save(garden);

    return {};
  }
}
