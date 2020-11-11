import { CommandHandler } from "../../../../shared/command-bus";
import { GARDEN_SET_ACTIVE_COMMAND_TYPE, GardenSetActiveCommand } from "../commands/garden-set-active.command";
import { GardenRepository } from "../../users/repositories/garden.repository";
import { AssignedGardensRepository } from "../../users/repositories/assigned-gardens.repository";
import { HttpError } from "../../../../../src/errors/http.error";
import { BAD_REQUEST } from "http-status-codes";


export interface GardenSetActiveHandlerDependencies {
  gardenRepository: GardenRepository;
  assignedGardensRepository: AssignedGardensRepository;
}

export default class GardenSetActiveHandler implements CommandHandler<GardenSetActiveCommand> {
  public commandType: string = GARDEN_SET_ACTIVE_COMMAND_TYPE;
  
  constructor(private dependencies: GardenSetActiveHandlerDependencies) {}

  async execute(command: GardenSetActiveCommand) {
    const {gardenRepository, assignedGardensRepository} = this.dependencies;
    const {gardenId, active} = command.payload;

    const garden = await gardenRepository.findOne(gardenId);

    if(!garden){
      throw new HttpError('Invalid garden id', BAD_REQUEST);
    }

    const gardenIsFree = await assignedGardensRepository.isGardenFree(gardenId);

    if(!gardenIsFree){
      throw new HttpError("Garden is occupied. Can not be archived", BAD_REQUEST);
    }

    garden.active = active;

    await gardenRepository.save(garden);

    return {}
  };
}
