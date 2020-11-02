import { Query } from "../../../../../shared/query-bus";

export const ME_QUERY_TYPE = "users/ME";

export interface MeQueryPayload {
  userId: string;
}

export class MeQuery implements Query<MeQueryPayload> {
  public type: string = ME_QUERY_TYPE;

  constructor(public payload: MeQueryPayload) {}
}
