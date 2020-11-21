import { Repository, EntityRepository } from "typeorm";
import { AssignedGardensModel } from "../../gardens/models/assigned-gardens.model";

@EntityRepository(AssignedGardensModel)
export class AssignedGardensRepository extends Repository<AssignedGardensModel> {
  async isGardenFree(gardenId: string) {
    const occupiedGarden = await this.getOccupiedGarden(gardenId);

    if (occupiedGarden) {
      return false;
    }
    return true;
  }

  async getOccupiedGarden(gardenId: string, userId?: string) {
    const selector = this.createQueryBuilder("assigned")
      .leftJoinAndSelect("assigned.garden", "garden")
      .where("garden.id=:gardenId", { gardenId })
      .andWhere("assigned.unassigned_at IS NULL");

    if (userId) {
      selector.leftJoinAndSelect("assigned.userBase", "userBase");
      selector.andWhere("userBase.id=:userId", { userId });
    }

    return selector.getOne();
  }
}
