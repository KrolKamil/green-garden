import { QueryResult } from "../../../../../shared/query-bus";

export class AssignedUserQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
