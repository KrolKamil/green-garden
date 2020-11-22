import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { LoginCommand } from "../commands/login.command";
import { Action } from "../../../../shared/http/types";
import { UserBaseType } from "../models/user-base.model";

export interface LoginActionDependencies {
  commandBus: CommandBus;
}

export const loginActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).max(80).required(),
      userType: Joi.string().valid(...Object.values(UserBaseType)),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class LoginAction implements Action {
  constructor(private dependencies: LoginActionDependencies) {}

  @ApiOperationPost({
    path: "/users/login",
    description: "Description",
    parameters: {
      body: { model: "LoginRequestModel" },
    },
    responses: {
      200: {
        description: "Success",
        model: "LoginResponseModel",
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
    const commandResult = await this.dependencies.commandBus.execute(new LoginCommand({ ...body }));

    res.json(commandResult.result);
  }
}
export default LoginAction;

@ApiModel({
  name: "LoginRequestModel",
})
export class LoginRequestModel {
  @ApiModelProperty({
    required: true,
  })
  email: string;

  @ApiModelProperty({
    required: true,
  })
  password: string;

  @ApiModelProperty({
    required: true,
    enum: [...Object.values(UserBaseType)],
  })
  userType: UserBaseType;
}

@ApiModel({
  name: "LoginResponseModel",
})
export class LoginResponseModel {
  @ApiModelProperty({
    required: true,
  })
  accessToken: string;

  @ApiModelProperty({
    required: true,
  })
  refreshToken: string;
}
