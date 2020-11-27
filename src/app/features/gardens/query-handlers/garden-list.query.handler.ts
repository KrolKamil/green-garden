import { QueryHandler } from "../../../../shared/query-bus";
import { GARDEN_LIST_QUERY_TYPE, GardenListQuery, GardenListQueryResult } from "../queries/garden-list";
import { GardenRepository } from "../../users/repositories/garden.repository";
import { GardenModel } from "../models/garden.model";

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
      .leftJoinAndSelect("garden.assignedGardens", "ag")
      .leftJoinAndSelect("ag.userBase", "ub")
      .getMany();

    return new GardenListQueryResult(this.getGardenListDTO(gardenList));
  }

  private getGardenListDTO(gardenList: GardenModel[]) {
    return gardenList.map((garden) => {
      const { assignedGardens, ...rest } = garden;
      const assignedGardenWithCurrentGardenOwner = assignedGardens.find(
        (assignedGarden) => assignedGarden.unassignedAt === null,
      );
      return {
        ...rest,
        assignedUser: assignedGardenWithCurrentGardenOwner ? assignedGardenWithCurrentGardenOwner.userBase : null,
      };
    });
  }
}
