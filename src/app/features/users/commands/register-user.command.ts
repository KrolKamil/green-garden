import { Command } from "../../../../shared/command-bus";

export const REGISTER_USER_COMMAND_TYPE = "users/REGISTER_USER";

export interface RegisterUserCommandPayload {
  email: string;
  password: string;
  workspaceId: string;
}

export class RegisterUserCommand implements Command<RegisterUserCommandPayload> {
  public type: string = REGISTER_USER_COMMAND_TYPE;

  constructor(public payload: RegisterUserCommandPayload) {}
}
