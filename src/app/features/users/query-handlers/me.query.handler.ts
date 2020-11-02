import { QueryHandler } from "../../../../shared/query-bus";
import { ME_QUERY_TYPE, MeQuery, MeQueryResult } from "../queries/me";
import { UserBaseRepository } from "../repositories/user-base.repository";

interface MeQueryHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class MeQueryHandler implements QueryHandler<MeQuery, MeQueryResult> {
  public queryType: string = ME_QUERY_TYPE;

  constructor(private dependencies: MeQueryHandlerDependencies) {}

  async execute(query: MeQuery): Promise<MeQueryResult> {
    const { userBaseRepository } = this.dependencies;
    const { userId } = query.payload;

    const user = await userBaseRepository.findOneOrFail(userId);
    // eslint-disable-next-line
    const { password, userNote, ...rest } = user;

    return new MeQueryResult(rest);
  }
}
