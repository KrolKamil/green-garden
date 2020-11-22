import { Command } from "../../../../shared/command-bus";

export const INVITE_MANAGER_COMMAND_TYPE = "users/INVITE_MANAGER";

export interface InviteManagerCommandPayload {
  email: string;
}

export class InviteManagerCommand implements Command<InviteManagerCommandPayload> {
  public type: string = INVITE_MANAGER_COMMAND_TYPE;

  constructor(public payload: InviteManagerCommandPayload) {}
}
