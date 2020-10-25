import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { LoginCommand } from "../commands/login.command";
import { Action } from "../../../../shared/http/types";

export interface LoginActionDependencies {
  commandBus: CommandBus;
}

export const loginActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(80).required(),
      workspaceId: Joi.string().required(),
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
    parameters: {},
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
    const commandResult = await this.dependencies.commandBus.execute(new LoginCommand({ ...body }));

    res.json(commandResult.result);
  }
}
export default LoginAction;
