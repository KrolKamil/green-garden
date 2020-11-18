import { QueryHandler } from "../../../../shared/query-bus";
import { ASSIGNED_USER_QUERY_TYPE, AssignedUserQuery, AssignedUserQueryResult } from "../queries/assigned-user";
import { UserBaseRepository } from "../../users/repositories/user-base.repository";
import { AssignedUserFilter } from "../actions/assigned-user.action";

interface AssignedUserQueryHandlerDependencies {
  userBaseRepository: UserBaseRepository;
}

export default class AssignedUserQueryHandler implements QueryHandler<AssignedUserQuery, AssignedUserQueryResult> {
  public queryType: string = ASSIGNED_USER_QUERY_TYPE;
  
  constructor(private dependencies: AssignedUserQueryHandlerDependencies) {}

  async execute(query: AssignedUserQuery): Promise<AssignedUserQueryResult> {
    const {userBaseRepository} = this.dependencies;
    const {gardenId, filter} = query.payload;

    const builder = await userBaseRepository
    .createQueryBuilder('ub')
    .leftJoinAndSelect('ub.assignedGardens', 'ag')
    .leftJoin('ag.garden', 'g')
    .where('g.id=:gardenId',{gardenId});
    if(filter === AssignedUserFilter.CURRENT){
      builder.andWhere('ag.unassigned_at is null');
    };

    const assignedUser = await builder.getMany();   
     return new AssignedUserQueryResult(assignedUser);
  }
}
