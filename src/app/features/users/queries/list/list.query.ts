import { Query } from "../../../../../shared/query-bus";

export const LIST_QUERY_TYPE = "users/LIST";

export interface ListQueryPayload {}

export class ListQuery implements Query<ListQueryPayload> {
  public type: string = LIST_QUERY_TYPE;

  constructor(public payload: ListQueryPayload) {}
}
