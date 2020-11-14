import { AwilixContainer } from "awilix";
import { UserBaseModel } from "../../src/app/features/users/models/user-base.model";
import { GardenModel } from "../../src/app/features/gardens/models/garden.model";
import { AssignedGardensRepository } from "../../src/app/features/users/repositories/assigned-gardens.repository";

export async function unassignGardenHelper(container: AwilixContainer, user: UserBaseModel, garden: GardenModel) {
  const assignedGardensRepository: AssignedGardensRepository = container.resolve('assignedGardensRepository');

  const occupiedGarden = await assignedGardensRepository.getOccupiedGarden(garden.id, user.id);

  if(!occupiedGarden) {
    throw new Error('This garden is not occupied by this user');
  }

  occupiedGarden.unassignedAt = new Date();

  return assignedGardensRepository.save(occupiedGarden);
}
