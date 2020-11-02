import { QueryResult } from "../../../../../shared/query-bus";

export class ListQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
