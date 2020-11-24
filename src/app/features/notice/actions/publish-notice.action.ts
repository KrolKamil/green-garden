import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { PublishNoticeCommand } from "../commands/publish-notice.command";
import { Action } from "../../../../shared/http/types";

export interface PublishNoticeActionDependencies {
  commandBus: CommandBus;
}

export const publishNoticeActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "notice",
})
class PublishNoticeAction implements Action {
  constructor(private dependencies: PublishNoticeActionDependencies) {}

  @ApiOperationPost({
    path: "/notice/publish-notice",
    description: "Description",
    parameters: {},
    responses: {
      200: {
        description: "Success",
      },
      400: {
        description: "Validation error",
      },
      500: {
        description: "Internal Server Error",
      },
    },
  })
  async invoke({ body }: Request, res: Response) {
    const commandResult = await this.dependencies.commandBus.execute(
      new PublishNoticeCommand({
        // command props
      }),
    );

    res.json(commandResult.result);
  }
}
export default PublishNoticeAction;
