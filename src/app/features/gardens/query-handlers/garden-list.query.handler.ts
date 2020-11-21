import { QueryHandler } from "../../../../shared/query-bus";
import { GARDEN_LIST_QUERY_TYPE, GardenListQuery, GardenListQueryResult } from "../queries/garden-list";
import { GardenRepository } from "../../users/repositories/garden.repository";

interface GardenListQueryHandlerDependencies {
  gardenRepository: GardenRepository;
}

export default class GardenListQueryHandler implements QueryHandler<GardenListQuery, GardenListQueryResult> {
  public queryType: string = GARDEN_LIST_QUERY_TYPE;

  constructor(private dependencies: GardenListQueryHandlerDependencies) {}

  async execute(_query: GardenListQuery): Promise<GardenListQueryResult> {
    const { gardenRepository } = this.dependencies;

    const gardenList = await gardenRepository
      .createQueryBuilder("garden")
      .select("garden.id", "id")
      .addSelect("garden.public_id", "publicId")
      .addSelect("garden.surface_in_square_meters", "surfaceInSquareMeters")
      .addSelect("garden.include_water", "includeWater")
      .addSelect("garden.include_electricity", "includeElectricity")
      .addSelect("garden.include_gas", "includeGas")
      .addSelect("garden.active", "active")
      .addSelect("garden.created_at", "createdAt")
      .addSelect("garden.updated_at", "updatedAt")
      .addSelect(
        `
    case when garden.id in(
      select ag.garden_id from assigned_gardens as ag
      where ag.unassigned_at is null
      ) then true else false end as "isOccupied"
    `,
      )
      .getRawMany();

    return new GardenListQueryResult(gardenList);
  }
}
