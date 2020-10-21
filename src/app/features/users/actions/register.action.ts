import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModelProperty, ApiModel } from "swagger-express-ts";
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
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(80).required(),
      workspace: Joi.string().optional()
    }
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})

@ApiModel( {
  description : "Register",
  name : "Register"
} )

class RegisterAction implements Action {
  constructor(private dependencies: RegisterActionDependencies) {}

  @ApiModelProperty({
    required: true,
  })
  email: string;

  @ApiModelProperty({
    required: true,
  })
  password: string;

  @ApiModelProperty({
    required: false,
  })
  invite: string;

  @ApiOperationPost({
    path: "/users/register",
    description: "Description",
    parameters: {
      body: {
        description: 'abc',
        model: 'Register'
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
      new RegisterCommand({...body}),
    );

    res.json(commandResult.result);
  }
}
export default RegisterAction;
