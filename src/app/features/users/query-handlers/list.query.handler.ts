import { QueryHandler } from "../../../../shared/query-bus";
import { LIST_QUERY_TYPE, ListQuery, ListQueryResult } from "../queries/list";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { UserBaseType } from "../models/user-base.model";

interface ListQueryHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class ListQueryHandler implements QueryHandler<ListQuery, ListQueryResult> {
  public queryType: string = LIST_QUERY_TYPE;

  constructor(private dependencies: ListQueryHandlerDependencies) {}

  async execute(_query: ListQuery): Promise<ListQueryResult> {
    const { userBaseRepository } = this.dependencies;
    const userList = await userBaseRepository.find({
      select: ["id", "email", "name", "surname"],
      where: {
        type: UserBaseType.USER,
      },
    });

    return new ListQueryResult(userList);
  }
}
