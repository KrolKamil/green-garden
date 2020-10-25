import { Command } from "../../../../shared/command-bus";
import { Event } from "../../../../shared/event-dispatcher/index";
import { RefreshAccessTokenCommandPayload } from "../commands/refresh-access-token.command";

export default class RefreshAccessTokenEvent implements Event {
  static eventName: string = "RefreshAccessToken";

  public payload: Command<RefreshAccessTokenCommandPayload>;

  get name() {
    return RefreshAccessTokenEvent.eventName;
  }

  public constructor(command: Command<RefreshAccessTokenCommandPayload>) {
    this.payload = command;
  }
}
