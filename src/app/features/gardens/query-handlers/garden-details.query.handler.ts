import { QueryHandler } from "../../../../shared/query-bus";
import { GARDEN_DETAILS_QUERY_TYPE, GardenDetailsQuery, GardenDetailsQueryResult } from "../queries/garden-details";

export default class GardenDetailsQueryHandler implements QueryHandler<GardenDetailsQuery, GardenDetailsQueryResult> {
  public queryType: string = GARDEN_DETAILS_QUERY_TYPE;

  async execute(query: GardenDetailsQuery): Promise<GardenDetailsQueryResult> {
    // do something with the query and transform it to result.
    return new GardenDetailsQueryResult(query);
  }
}
