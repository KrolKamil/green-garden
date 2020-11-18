import { Query } from "../../../../../shared/query-bus";
import { AssignedUserFilter } from "../../actions/assigned-user.action";

export const ASSIGNED_USER_QUERY_TYPE = "gardens/ASSIGNED_USER";

export interface AssignedUserQueryPayload {
  gardenId: string;
  filter: AssignedUserFilter;
}

export class AssignedUserQuery implements Query<AssignedUserQueryPayload> {
  public type: string = ASSIGNED_USER_QUERY_TYPE;

  constructor(public payload: AssignedUserQueryPayload) {}
}
