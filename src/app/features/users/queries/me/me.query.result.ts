import { QueryResult } from "../../../../../shared/query-bus";

export class MeQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
