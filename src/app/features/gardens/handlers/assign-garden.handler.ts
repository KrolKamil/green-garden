import {v4 as uuid} from 'uuid';
import { BAD_REQUEST } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { ASSIGN_GARDEN_COMMAND_TYPE, AssignGardenCommand } from "../commands/assign-garden.command";
import { AssignedGardensRepository } from "../../users/repositories/assigned-gardens.repository";
import { UserBaseRepository } from "../../users/repositories/user-base.repository";
import { GardenRepository } from "../../users/repositories/garden.repository";
import { HttpError } from "../../../../errors/http.error";
import { AssignedGardensModel } from "../models/assigned-gardens.model";
import { getManager } from 'typeorm';

export interface AssignGardenHandlerDependencies {
  userBaseRepository: UserBaseRepository;
  gardenRepository: GardenRepository;
  assignedGardensRepository: AssignedGardensRepository;
}

export default class AssignGardenHandler implements CommandHandler<AssignGardenCommand> {
  public commandType: string = ASSIGN_GARDEN_COMMAND_TYPE;
  
  constructor(private dependencies: AssignGardenHandlerDependencies) {}

  async execute(command: AssignGardenCommand) {
    const {userBaseRepository, gardenRepository, assignedGardensRepository} = this.dependencies;
    const {userId, gardenId} = command.payload;

    const user = await userBaseRepository.findOne({where: {
      id: userId,
      active: true
    }});
    
    if(!user){
      throw new HttpError('User does not exist', BAD_REQUEST)
    }

    const garden = await gardenRepository.findOne({
      where: {
        id: gardenId,
        active: true
      }
    });

    if(!garden){
      throw new HttpError('Garden does not exist', BAD_REQUEST);
    }

    const gardenIsFree = await assignedGardensRepository.isGardenFree(gardenId);

    if(!gardenIsFree){
      throw new HttpError("Garden is occupied", BAD_REQUEST);
    }

    const assignedGardens = await assignedGardensRepository
    .save(AssignedGardensModel.create({
      id: uuid(),
      userBase: user,
      garden,
      assignedAt: new Date()
    }));
    
    return {}
  };
}
