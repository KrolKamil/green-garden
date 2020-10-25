import { Command } from "../../../../shared/command-bus";

export const REFRESH_ACCESS_TOKEN_COMMAND_TYPE = "users/REFRESH_ACCESS_TOKEN";

export interface RefreshAccessTokenCommandPayload {
  refreshToken: string;
}

export class RefreshAccessTokenCommand implements Command<RefreshAccessTokenCommandPayload> {
  public type: string = REFRESH_ACCESS_TOKEN_COMMAND_TYPE;

  constructor(public payload: RefreshAccessTokenCommandPayload) {}
}
