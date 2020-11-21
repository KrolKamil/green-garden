import { QueryResult } from "../../../../../shared/query-bus";

export class GardenListQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
