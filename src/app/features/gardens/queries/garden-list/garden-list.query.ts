import { Query } from "../../../../../shared/query-bus";

export const GARDEN_LIST_QUERY_TYPE = "gardens/GARDEN_LIST";

export interface GardenListQueryPayload {}

export class GardenListQuery implements Query<GardenListQueryPayload> {
  public type: string = GARDEN_LIST_QUERY_TYPE;

  constructor(public payload: GardenListQueryPayload) {}
}
