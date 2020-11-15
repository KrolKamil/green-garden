import { Query } from "../../../../../shared/query-bus";
import { UserBaseDTO } from "../../../../features/users/models/user-base.dto";

export const GARDEN_DETAILS_QUERY_TYPE = "gardens/GARDEN_DETAILS";

export interface GardenDetailsQueryPayload {
  gardenId: string;
  userDTO: UserBaseDTO
}

export class GardenDetailsQuery implements Query<GardenDetailsQueryPayload> {
  public type: string = GARDEN_DETAILS_QUERY_TYPE;

  constructor(public payload: GardenDetailsQueryPayload) {}
}
