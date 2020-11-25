import { QueryHandler } from "../../../../shared/query-bus";
import { GET_NOTICE_QUERY_TYPE, GetNoticeQuery, GetNoticeQueryResult } from "../queries/get-notice";
import { Repository } from "typeorm";
import { NoticeModel } from "../models/notice.model";
import { HttpError } from "../../../../../src/errors/http.error";
import { NOT_FOUND } from "http-status-codes";

interface GetNoticeQueryHandlerDependencies {
  noticeRepository: Repository<NoticeModel>
}

export default class GetNoticeQueryHandler implements QueryHandler<GetNoticeQuery, GetNoticeQueryResult> {
  public queryType: string = GET_NOTICE_QUERY_TYPE;

  constructor(private dependencies: GetNoticeQueryHandlerDependencies){}

  async execute(query: GetNoticeQuery): Promise<GetNoticeQueryResult> {
    const {noticeRepository} = this.dependencies;
    const {noticeId} = query.payload;

    const notice = await noticeRepository.findOne({
      where: {id: noticeId},
      relations: ['creator']
    });

    if(!notice){
      throw new HttpError('Not found', NOT_FOUND)
    }

    return new GetNoticeQueryResult(notice);
  }
}
