import { QueryHandler } from "../../../../shared/query-bus";
import { PENDING_USER_QUERY_TYPE, PendingUserQuery, PendingUserQueryResult } from "../queries/pending-user";
import { Repository } from "typeorm";
import { PendingUserModel } from "../models/pending-user.model";
import { HttpError } from "../../../../../src/errors/http.error";
import { NOT_FOUND } from "http-status-codes";

interface PendingUserQueryHandlerDependencies {
  pendingUserRepository: Repository<PendingUserModel>
}

export default class PendingUserQueryHandler implements QueryHandler<PendingUserQuery, PendingUserQueryResult> {
  public queryType: string = PENDING_USER_QUERY_TYPE;

  constructor(private dependencies: PendingUserQueryHandlerDependencies){}

  async execute(query: PendingUserQuery): Promise<PendingUserQueryResult> {
    const {pendingUserRepository} = this.dependencies;
    const {userId} = query.payload;
    const pendingUser = await pendingUserRepository.findOne(userId);
    
    if(!pendingUser){
      throw new HttpError("User not found", NOT_FOUND);
    }

    return new PendingUserQueryResult(pendingUser);
  }
}
