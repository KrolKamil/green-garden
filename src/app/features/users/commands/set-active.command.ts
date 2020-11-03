import { Command } from "../../../../shared/command-bus";

export const SET_ACTIVE_COMMAND_TYPE = "users/SET_ACTIVE";

export interface SetActiveCommandPayload {
  userId: string;
  active: boolean;
}

export class SetActiveCommand implements Command<SetActiveCommandPayload> {
  public type: string = SET_ACTIVE_COMMAND_TYPE;

  constructor(public payload: SetActiveCommandPayload) {}
}
