import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { EditNoticeCommand } from "../commands/edit-notice.command";
import { Action } from "../../../../shared/http/types";

export interface EditNoticeActionDependencies {
  commandBus: CommandBus;
}

export const editNoticeActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      noticeId: Joi.string().required(),
      title: Joi.string().optional(),
      content: Joi.string().optional()
    }).or('title', 'content')
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "notice",
})
class EditNoticeAction implements Action {
  constructor(private dependencies: EditNoticeActionDependencies) {}

  @ApiOperationPost({
    path: "/notice/edit-notice",
    description: "Description",
    parameters: {
      body: {
        model: 'EditNoticeActionRequest'
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
      new EditNoticeCommand({
        noticeId: body.noticeId,
        title: body.title || null,
        content: body.content || null,
        creatorDTO: res.locals.userDTO
      }),
    );

    res.json(commandResult.result);
  }
}
export default EditNoticeAction;


@ApiModel({
  name: "EditNoticeActionRequest",
})
export class EditNoticeActionRequest {
  @ApiModelProperty({})
  noticeId: string;

  @ApiModelProperty({})
  title: string;

  @ApiModelProperty({})
  content: string;
}
