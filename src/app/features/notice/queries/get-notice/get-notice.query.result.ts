import { QueryResult } from "../../../../../shared/query-bus";

export class GetNoticeQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
