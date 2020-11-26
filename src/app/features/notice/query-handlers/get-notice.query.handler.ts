import { Repository } from "typeorm";
import { NOT_FOUND } from "http-status-codes";
import { QueryHandler } from "../../../../shared/query-bus";
import { GET_NOTICE_QUERY_TYPE, GetNoticeQuery, GetNoticeQueryResult } from "../queries/get-notice";
import { NoticeModel } from "../models/notice.model";
import { HttpError } from "../../../../errors/http.error";

interface GetNoticeQueryHandlerDependencies {
  noticeRepository: Repository<NoticeModel>;
}

export default class GetNoticeQueryHandler implements QueryHandler<GetNoticeQuery, GetNoticeQueryResult> {
  public queryType: string = GET_NOTICE_QUERY_TYPE;

  constructor(private dependencies: GetNoticeQueryHandlerDependencies) {}

  async execute(query: GetNoticeQuery): Promise<GetNoticeQueryResult> {
    const { noticeRepository } = this.dependencies;
    const { noticeId } = query.payload;

    const notice = await noticeRepository.findOne({
      where: { id: noticeId },
      relations: ["creator"],
    });

    if (!notice) {
      throw new HttpError("Not found", NOT_FOUND);
    }

    return new GetNoticeQueryResult(notice);
  }
}
