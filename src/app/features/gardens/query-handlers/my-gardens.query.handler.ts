import { QueryHandler } from "../../../../shared/query-bus";
import { MY_GARDENS_QUERY_TYPE, MyGardensQuery, MyGardensQueryResult } from "../queries/my-gardens";
import { GardenRepository } from "../../users/repositories/garden.repository";

interface MyGardensQueryHandlerDependencies {
  gardenRepository: GardenRepository;
}

export default class MyGardensQueryHandler implements QueryHandler<MyGardensQuery, MyGardensQueryResult> {
  public queryType: string = MY_GARDENS_QUERY_TYPE;

  constructor(private dependiencies: MyGardensQueryHandlerDependencies){}

  async execute(query: MyGardensQuery): Promise<MyGardensQueryResult> {
    const {gardenRepository} = this.dependiencies;
    const {userId} = query.payload;

    const userGardens = await gardenRepository
    .createQueryBuilder('garden')
    .leftJoin("garden.assignedGardens", 'ag')
    .leftJoin("ag.userBase", 'ub')
    .select('garden.id', 'id')
    .addSelect('garden.public_id', 'publicId')
    .addSelect('garden.surface_in_square_meters', 'surfaceInSquareMeters')
    .addSelect('garden.include_water', 'includeWater')
    .addSelect('garden.include_electricity', 'includeElectricity')
    .addSelect('garden.include_gas', 'includeGas')
    .where('ub.id=:userId', {userId})
    .andWhere('ag.unassignedAt is null')
    .getRawMany();

    return new MyGardensQueryResult(userGardens);
  }
}
