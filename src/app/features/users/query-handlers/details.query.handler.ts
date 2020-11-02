import { BAD_REQUEST } from "http-status-codes";
import { QueryHandler } from "../../../../shared/query-bus";
import { DETAILS_QUERY_TYPE, DetailsQuery, DetailsQueryResult } from "../queries/details";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { UserBaseType } from "../models/user-base.model";
import { HttpError } from "../../../../errors/http.error";

export interface DetailsQueryHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class DetailsQueryHandler implements QueryHandler<DetailsQuery, DetailsQueryResult> {
  public queryType: string = DETAILS_QUERY_TYPE;

  constructor(private dependencies: DetailsQueryHandlerDependencies) {}

  async execute(query: DetailsQuery): Promise<DetailsQueryResult> {
    const { userBaseRepository } = this.dependencies;
    const { userId } = query.payload;

    const user = await userBaseRepository.findOne({
      where: { id: userId, type: UserBaseType.USER },
      relations: ["userNote"],
    });

    if (!user) {
      throw new HttpError("Invalid user id", BAD_REQUEST);
    }

    // eslint-disable-next-line
    const { password, ...rest } = user;

    return new DetailsQueryResult(rest);
  }
}
