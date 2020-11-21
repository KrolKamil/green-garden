import { QueryHandler } from "../../../../shared/query-bus";
import {
  ASSIGNED_GARDENS_QUERY_TYPE,
  AssignedGardensQuery,
  AssignedGardensQueryResult,
} from "../queries/assigned-gardens";
import { AssignedGardensFilter } from "../actions/assigned-gardens.action";
import { GardenRepository } from "../repositories/garden.repository";

interface AssignedGardensQueryHandlerDependencies {
  gardenRepository: GardenRepository;
}

// eslint-disable-next-line
export default class AssignedGardensQueryHandler implements QueryHandler<AssignedGardensQuery, AssignedGardensQueryResult> {
  public queryType: string = ASSIGNED_GARDENS_QUERY_TYPE;

  constructor(private dependencies: AssignedGardensQueryHandlerDependencies) {}

  async execute(query: AssignedGardensQuery): Promise<AssignedGardensQueryResult> {
    const { gardenRepository } = this.dependencies;
    const { userId, filter } = query.payload;

    const builder = await gardenRepository
      .createQueryBuilder("g")
      .leftJoinAndSelect("g.assignedGardens", "ag")
      .leftJoin("ag.userBase", "ub")
      .where("ub.id=:userId", { userId });
    if (filter === AssignedGardensFilter.CURRENT) {
      builder.andWhere("ag.unassigned_at is null");
    }

    const assignedGardens = await builder.getMany();
    return new AssignedGardensQueryResult(assignedGardens);
  }
}
