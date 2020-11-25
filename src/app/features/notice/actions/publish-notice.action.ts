import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { PublishNoticeCommand } from "../commands/publish-notice.command";
import { Action } from "../../../../shared/http/types";
import { NoticeType } from "../models/notice.model";

export interface PublishNoticeActionDependencies {
  commandBus: CommandBus;
}

export const publishNoticeActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      title: Joi.string().min(1).max(50).required(),
      content: Joi.string().min(1).max(1000).required(),
      type: Joi.string().valid(...Object.values(NoticeType)).optional()
    }
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
    parameters: {
      body: {
        model: 'PublishNoticeActionRequest'
      }
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
      new PublishNoticeCommand({
        title: body.title,
        content: body.content,
        type: body.type || NoticeType.NORMAL,
        creatorDTO: res.locals.userDTO
      }),
    );

    res.json(commandResult.result);
  }
}
export default PublishNoticeAction;


@ApiModel({
  name: "PublishNoticeActionRequest",
})
export class PublishNoticeActionRequest {
  @ApiModelProperty({})
  title: string;

  @ApiModelProperty({})
  content: string;

  @ApiModelProperty({
    enum: [...Object.values(NoticeType)],
  })
  type: NoticeType;
}
