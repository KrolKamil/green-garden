import { Query } from "../../../../../shared/query-bus";

export const DETAILS_QUERY_TYPE = "users/DETAILS";

export interface DetailsQueryPayload {
  userId: string;
}

export class DetailsQuery implements Query<DetailsQueryPayload> {
  public type: string = DETAILS_QUERY_TYPE;

  constructor(public payload: DetailsQueryPayload) {}
}
