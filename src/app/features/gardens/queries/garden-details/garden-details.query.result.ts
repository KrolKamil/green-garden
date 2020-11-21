import { QueryResult } from "../../../../../shared/query-bus";

export class GardenDetailsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
