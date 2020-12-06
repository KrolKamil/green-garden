import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { DeleteNoticeCommand } from "../commands/delete-notice.command";
import { Action } from "../../../../shared/http/types";

export interface DeleteNoticeActionDependencies {
  commandBus: CommandBus;
}

export const deleteNoticeActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      noticeId: Joi.string().required(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "notice",
})
class DeleteNoticeAction implements Action {
  constructor(private dependencies: DeleteNoticeActionDependencies) {}

  @ApiOperationPost({
    path: "/notice/delete-notice",
    description: "Description",
    parameters: {
      body: {
        model: "DeleteNoticeActionRequest",
      },
    },
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
      new DeleteNoticeCommand({
        noticeId: body.noticeId,
      }),
    );

    res.json(commandResult.result);
  }
}
export default DeleteNoticeAction;

@ApiModel({
  name: "DeleteNoticeActionRequest",
})
export class DeleteNoticeActionRequest {
  @ApiModelProperty({})
  noticeId: string;
}
