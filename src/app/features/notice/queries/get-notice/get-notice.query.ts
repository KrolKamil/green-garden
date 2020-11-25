import { Query } from "../../../../../shared/query-bus";

export const GET_NOTICE_QUERY_TYPE = "notice/GET_NOTICE";

export interface GetNoticeQueryPayload {
  noticeId: string;
}

export class GetNoticeQuery implements Query<GetNoticeQueryPayload> {
  public type: string = GET_NOTICE_QUERY_TYPE;

  constructor(public payload: GetNoticeQueryPayload) {}
}
