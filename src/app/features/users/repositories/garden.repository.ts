import { Repository, EntityRepository } from "typeorm";
import { GardenModel } from "../../gardens/models/garden.model";

@EntityRepository(GardenModel)
export class GardenRepository extends Repository<GardenModel> {}
