import { QueryResult } from "../../../../../shared/query-bus";

export class NoticeListQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
