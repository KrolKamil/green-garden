import { QueryResult } from "../../../../../shared/query-bus";

export class DetailsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
