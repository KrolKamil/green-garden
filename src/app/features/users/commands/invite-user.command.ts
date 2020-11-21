import { Command } from "../../../../shared/command-bus";

export const INVITE_USER_COMMAND_TYPE = "users/INVITE_USER";

export interface InviteUserCommandPayload {
  email: string;
}

export class InviteUserCommand implements Command<InviteUserCommandPayload> {
  public type: string = INVITE_USER_COMMAND_TYPE;

  constructor(public payload: InviteUserCommandPayload) {}
}
