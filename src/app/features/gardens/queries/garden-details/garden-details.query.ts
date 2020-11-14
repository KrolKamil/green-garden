import { Query } from "../../../../../shared/query-bus";

export const GARDEN_DETAILS_QUERY_TYPE = "gardens/GARDEN_DETAILS";

export interface GardenDetailsQueryPayload {}

export class GardenDetailsQuery implements Query<GardenDetailsQueryPayload> {
  public type: string = GARDEN_DETAILS_QUERY_TYPE;

  constructor(public payload: GardenDetailsQueryPayload) {}
}
