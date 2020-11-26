import { Query } from "../../../../../shared/query-bus";

export const NOTICE_LIST_QUERY_TYPE = "notice/NOTICE_LIST";

export interface NoticeListQueryPayload {}

export class NoticeListQuery implements Query<NoticeListQueryPayload> {
  public type: string = NOTICE_LIST_QUERY_TYPE;

  constructor(public payload: NoticeListQueryPayload) {}
}
