import { QueryResult } from "../../../../../shared/query-bus";

export class AssignedGardensQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
