import { Repository } from "typeorm";
import { QueryHandler } from "../../../../shared/query-bus";
import { NOTICE_LIST_QUERY_TYPE, NoticeListQuery, NoticeListQueryResult } from "../queries/notice-list";
import { NoticeModel } from "../models/notice.model";

interface NoticeListQueryHandlerDependencies {
  noticeRepository: Repository<NoticeModel>;
}

export default class NoticeListQueryHandler implements QueryHandler<NoticeListQuery, NoticeListQueryResult> {
  public queryType: string = NOTICE_LIST_QUERY_TYPE;

  constructor(private dependencies: NoticeListQueryHandlerDependencies) {}

  async execute(_query: NoticeListQuery): Promise<NoticeListQueryResult> {
    const { noticeRepository } = this.dependencies;
    const notices = await noticeRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
    return new NoticeListQueryResult(notices);
  }
}
