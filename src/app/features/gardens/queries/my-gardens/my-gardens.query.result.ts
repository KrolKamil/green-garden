import { QueryResult } from "../../../../../shared/query-bus";

export class MyGardensQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
