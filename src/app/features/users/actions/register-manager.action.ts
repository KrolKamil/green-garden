import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { RegisterManagerCommand } from "../commands/register-manager.command";
import { Action } from "../../../../shared/http/types";

export interface RegisterManagerActionDependencies {
  commandBus: CommandBus;
}

export const registerManagerActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      email: Joi.string().email({tlds: {allow: false}}).required(),
      password: Joi.string().min(6).max(80).required(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class RegisterManagerAction implements Action {
  constructor(private dependencies: RegisterManagerActionDependencies) {}

  @ApiOperationPost({
    path: "/users/register-manager",
    description: "Description",
    parameters: {
      body: { model: "RegisterManagerRequestModel" },
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
      new RegisterManagerCommand({
        ...body,
      }),
    );

    res.json(commandResult.result);
  }
}
export default RegisterManagerAction;

@ApiModel({
  name: "RegisterManagerRequestModel",
})
export class RegisterManagerRequestModel {
  @ApiModelProperty({
    required: true,
  })
  email: string;

  @ApiModelProperty({
    required: true,
  })
  password: string;
}
