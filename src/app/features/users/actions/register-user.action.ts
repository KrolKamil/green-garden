import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { RegisterUserCommand } from "../commands/register-user.command";
import { Action } from "../../../../shared/http/types";

export interface RegisterUserActionDependencies {
  commandBus: CommandBus;
}

export const registerUserActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(80).required(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class RegisterUserAction implements Action {
  constructor(private dependencies: RegisterUserActionDependencies) {}

  @ApiOperationPost({
    path: "/users/register-user",
    description: "Description",
    parameters: {
      body: { model: "RegisterUserRequestModel" },
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
      new RegisterUserCommand({
        ...body,
      }),
    );

    res.json(commandResult.result);
  }
}
export default RegisterUserAction;

@ApiModel({
  name: "RegisterUserRequestModel",
})
export class RegisterUserRequestModel {
  @ApiModelProperty({
    required: true,
  })
  email: string;

  @ApiModelProperty({
    required: true,
  })
  password: string;
}
