import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { SetActiveCommand } from "../commands/set-active.command";
import { Action } from "../../../../shared/http/types";

export interface SetActiveActionDependencies {
  commandBus: CommandBus;
}

export const setActiveActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class SetActiveAction implements Action {
  constructor(private dependencies: SetActiveActionDependencies) {}

  @ApiOperationPost({
    path: "/users/set-active",
    description: "Description",
    parameters: {
      body: {
        model: "SetActiveActionRequestModel",
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
      new SetActiveCommand({
        ...body,
      }),
    );

    res.json(commandResult.result);
  }
}
export default SetActiveAction;

@ApiModel({
  name: "SetActiveActionRequestModel",
})
export class SetActiveActionRequestModel {
  @ApiModelProperty({})
  userId: string;

  @ApiModelProperty({})
  active: boolean;
}
