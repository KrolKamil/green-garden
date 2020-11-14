import { Query } from "../../../../../shared/query-bus";

export const MY_GARDENS_QUERY_TYPE = "gardens/MY_GARDENS";

export interface MyGardensQueryPayload {}

export class MyGardensQuery implements Query<MyGardensQueryPayload> {
  public type: string = MY_GARDENS_QUERY_TYPE;

  constructor(public payload: MyGardensQueryPayload) {}
}
