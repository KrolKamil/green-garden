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

    const userList = await userBaseRepository
      .createQueryBuilder("ub")
      .select("ub.id", "id")
      .addSelect("ub.email", "email")
      .addSelect("ub.name", "name")
      .addSelect("ub.surname", "surname")
      .addSelect("ub.phone", "phone")
      .addSelect("ub.type", "type")
      .addSelect("ub.active", "active")
      .addSelect("ub.created_at", "createdAt")
      .addSelect("ub.updated_at", "updatedAt")
      .addSelect("case when un.content <> '' then true else false end as \"containsNote\"")
      .leftJoin("ub.userNote", "un")
      .where("ub.type=:userType", { userType: UserBaseType.USER })
      .getRawMany();
    return new ListQueryResult(userList);
  }
}
