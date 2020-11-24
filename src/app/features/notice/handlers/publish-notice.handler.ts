import { CommandHandler } from "../../../../shared/command-bus";
import { PUBLISH_NOTICE_COMMAND_TYPE, PublishNoticeCommand } from "../commands/publish-notice.command";
import { EventDispatcher } from "../../../../shared/event-dispatcher";
import PublishNoticeEvent from "../events/publish-notice.event";


export interface PublishNoticeHandlerDependencies {
  eventDispatcher: EventDispatcher;
}

export default class PublishNoticeHandler implements CommandHandler<PublishNoticeCommand> {
  public commandType: string = PUBLISH_NOTICE_COMMAND_TYPE;
  
  constructor(private dependencies: PublishNoticeHandlerDependencies) {}

  async execute(command: PublishNoticeCommand) {
    // execute body
    await this.dependencies.eventDispatcher.dispatch(new PublishNoticeEvent(command))

    return {
      result: command
    }
  };
}
