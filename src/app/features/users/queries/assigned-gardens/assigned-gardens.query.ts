import { Query } from "../../../../../shared/query-bus";
import {AssignedGardensFilter} from '../../actions/assigned-gardens.action'

export const ASSIGNED_GARDENS_QUERY_TYPE = "users/ASSIGNED_GARDENS";

export interface AssignedGardensQueryPayload {
  userId: string;
  filter: AssignedGardensFilter;
}

export class AssignedGardensQuery implements Query<AssignedGardensQueryPayload> {
  public type: string = ASSIGNED_GARDENS_QUERY_TYPE;

  constructor(public payload: AssignedGardensQueryPayload) {}
}
