import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { InviteUserCommand } from "../commands/invite-user.command";
import { Action } from "../../../../shared/http/types";

export interface InviteUserActionDependencies {
  commandBus: CommandBus;
}

export const inviteUserActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      email: Joi.string().email({tlds: {allow: false}}).required(),
    }
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class InviteUserAction implements Action {
  constructor(private dependencies: InviteUserActionDependencies) {}

  @ApiOperationPost({
    path: "/users/invite-user",
    description: "Description",
    parameters: {
      body: {
        model: 'InviteUserActionRequest'
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
      new InviteUserCommand({
        ...body
      }),
    );

    res.json(commandResult.result);
  }
}
export default InviteUserAction;



@ApiModel({
  name: "InviteUserActionRequest",
})
export class InviteUserActionRequest {
  @ApiModelProperty({})
  email: string;
}
