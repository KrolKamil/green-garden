import { QueryHandler } from "../../../../shared/query-bus";
import { DETAILS_QUERY_TYPE, DetailsQuery, DetailsQueryResult } from "../queries/details";
import { UserBaseRepository } from "../repositories/user-base.repository";

interface DetailsQueryHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class DetailsQueryHandler implements QueryHandler<DetailsQuery, DetailsQueryResult> {
  public queryType: string = DETAILS_QUERY_TYPE;

  constructor(private dependencies: DetailsQueryHandlerDependencies){}

  async execute(query: DetailsQuery): Promise<DetailsQueryResult> {
    const {userBaseRepository} = this.dependencies;
    const {userId} = query.payload;

    const user = await userBaseRepository.findOneOrFail(userId);
    const {password, ...rest} = user;
    return new DetailsQueryResult(rest);
  }
}
