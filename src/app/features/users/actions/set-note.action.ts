import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { SetNoteCommand } from "../commands/set-note.command";
import { Action } from "../../../../shared/http/types";

export interface SetNoteActionDependencies {
  commandBus: CommandBus;
}

export const setNoteActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      userId: Joi.string().required(),
      content: Joi.string().max(200).required()
    }
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class SetNoteAction implements Action {
  constructor(private dependencies: SetNoteActionDependencies) {}

  @ApiOperationPost({
    path: "/users/set-note",
    description: "Description",
    parameters: {},
    responses: {
      200: {
        description: "Success",
        model: 'SetNoteActionRequestModel'
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
      new SetNoteCommand({
        ...body
      }),
    );

    res.json(commandResult.result);
  }
}
export default SetNoteAction;


@ApiModel({
  name: "SetNoteActionRequestModel",
})
export class SetNoteActionRequestModel {
  @ApiModelProperty({})
  userId: string;

  @ApiModelProperty({})
  content: string;
}
