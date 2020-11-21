import { BAD_REQUEST } from "http-status-codes";
import { CommandHandler } from "../../../../shared/command-bus";
import { UNASSIGN_GARDEN_COMMAND_TYPE, UnassignGardenCommand } from "../commands/unassign-garden.command";
import { AssignedGardensRepository } from "../../users/repositories/assigned-gardens.repository";
import { UserBaseRepository } from "../../users/repositories/user-base.repository";
import { GardenRepository } from "../../users/repositories/garden.repository";
import { HttpError } from "../../../../errors/http.error";

export interface UnassignGardenHandlerDependencies {
  userBaseRepository: UserBaseRepository;
  gardenRepository: GardenRepository;
  assignedGardensRepository: AssignedGardensRepository;
}

export default class UnassignGardenHandler implements CommandHandler<UnassignGardenCommand> {
  public commandType: string = UNASSIGN_GARDEN_COMMAND_TYPE;

  constructor(private dependencies: UnassignGardenHandlerDependencies) {}

  async execute(command: UnassignGardenCommand) {
    const { userBaseRepository, gardenRepository, assignedGardensRepository } = this.dependencies;
    const { userId, gardenId } = command.payload;

    const user = await userBaseRepository.findOne({
      where: {
        id: userId,
        active: true,
      },
    });

    if (!user) {
      throw new HttpError("User does not exist", BAD_REQUEST);
    }

    const garden = await gardenRepository.findOne({
      where: {
        id: gardenId,
        active: true,
      },
    });

    if (!garden) {
      throw new HttpError("Garden does not exist", BAD_REQUEST);
    }

    const occupiedGarden = await assignedGardensRepository.getOccupiedGarden(gardenId, userId);

    if (!occupiedGarden) {
      throw new HttpError("This garden is not occupied by this user", BAD_REQUEST);
    }

    occupiedGarden.unassignedAt = new Date();

    await assignedGardensRepository.save(occupiedGarden);

    return {};
  }
}
