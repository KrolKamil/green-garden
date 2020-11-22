import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { RegisterCommand } from "../commands/register.command";
import { Action } from "../../../../shared/http/types";

export interface RegisterActionDependencies {
  commandBus: CommandBus;
}

export const registerActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      userId: Joi.string().required(),
      password: Joi.string().min(6).max(80).required(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class RegisterAction implements Action {
  constructor(private dependencies: RegisterActionDependencies) {}

  @ApiOperationPost({
    path: "/users/register",
    description: "Description",
    parameters: {
      body: {
        model: "RegisterActionRequest",
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
      new RegisterCommand({
        ...body,
      }),
    );

    res.json(commandResult.result);
  }
}
export default RegisterAction;

@ApiModel({
  name: "RegisterActionRequest",
})
export class RegisterActionRequest {
  @ApiModelProperty({})
  userId: string;

  @ApiModelProperty({})
  password: string;
}
