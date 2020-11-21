import { Query } from "../../../../../shared/query-bus";

export const PENDING_USER_QUERY_TYPE = "users/PENDING_USER";

export interface PendingUserQueryPayload {
  userId: string;
}

export class PendingUserQuery implements Query<PendingUserQueryPayload> {
  public type: string = PENDING_USER_QUERY_TYPE;

  constructor(public payload: PendingUserQueryPayload) {}
}
