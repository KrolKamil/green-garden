import { QueryResult } from "../../../../../shared/query-bus";

export class PendingUserQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
