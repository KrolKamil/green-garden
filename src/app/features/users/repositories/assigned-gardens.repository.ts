import { Repository, EntityRepository } from "typeorm";
import { AssignedGardensModel } from "../../gardens/models/assigned-gardens.model";

@EntityRepository(AssignedGardensModel)
export class AssignedGardensRepository extends Repository<AssignedGardensModel> {
    async isGardenFree(gardenId: string){
        const occupiedGarden = await this.createQueryBuilder('assigned')
        .leftJoinAndSelect('assigned.garden', 'garden')
        .where('garden.id=:gardenId',{gardenId})
        .andWhere('assigned.unassigned_at IS NULL')
        .getOne();

        if(occupiedGarden){
            return false;
        }
        return true;
    }
}