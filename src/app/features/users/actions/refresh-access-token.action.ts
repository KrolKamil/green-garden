import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { RefreshAccessTokenCommand } from "../commands/refresh-access-token.command";
import { Action } from "../../../../shared/http/types";

export interface RefreshAccessTokenActionDependencies {
  commandBus: CommandBus;
}

export const refreshAccessTokenActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      refreshToken: Joi.string().required(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class RefreshAccessTokenAction implements Action {
  constructor(private dependencies: RefreshAccessTokenActionDependencies) {}

  @ApiOperationPost({
    path: "/users/refresh-access-token",
    description: "Description",
    parameters: {
      body: { model: "RefreshAccessTokenRequestModel" },
    },
    responses: {
      200: {
        description: "Success",
        model: "RefreshAccessTokenResponseModel",
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
      new RefreshAccessTokenCommand({
        ...body,
      }),
    );

    res.json(commandResult.result);
  }
}
export default RefreshAccessTokenAction;

@ApiModel({
  name: "RefreshAccessTokenRequestModel",
})
export class RefreshAccessTokenRequestModel {
  @ApiModelProperty({
    required: true,
  })
  refreshToken: string;
}

@ApiModel({
  name: "RefreshAccessTokenResponseModel",
})
export class RefreshAccessTokenResponseModel {
  @ApiModelProperty({
    required: true,
  })
  accessToken: string;

  @ApiModelProperty({
    required: true,
  })
  refreshToken: string;
}
