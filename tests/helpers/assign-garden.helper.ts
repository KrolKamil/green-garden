import {v4 as uuid} from 'uuid';
import { AwilixContainer } from "awilix";
import { UserBaseModel } from "../../src/app/features/users/models/user-base.model";
import { GardenModel } from "../../src/app/features/gardens/models/garden.model";
import { AssignedGardensRepository } from "../../src/app/features/users/repositories/assigned-gardens.repository";
import { AssignedGardensModel } from "../../src/app/features/gardens/models/assigned-gardens.model";

export async function assignGardenHelper(container: AwilixContainer, user: UserBaseModel, garden: GardenModel) {
  const assignedGardensRepository: AssignedGardensRepository = container.resolve('assignedGardensRepository');

  const gardenIsFree = await assignedGardensRepository.isGardenFree(garden.id);

  if(!gardenIsFree){
    throw new Error("Garden is occupied");
  }

  return assignedGardensRepository
  .save(AssignedGardensModel.create({
    id: uuid(),
    userBase: user,
    garden,
    assignedAt: new Date()
  }));
}
