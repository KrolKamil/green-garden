import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { PendingUserQuery } from "../queries/pending-user";
import { Action } from "../../../../shared/http/types";
import { UserBaseType } from "../models/user-base.model";

export interface PendingUserActionDependencies {
  queryBus: QueryBus;
}

export const pendingUserActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class PendingUserAction implements Action {
  constructor(private dependencies: PendingUserActionDependencies) {}

  @ApiOperationGet({
    path: "/users/:userId/pending-user",
    description: "Description",
    responses: {
      200: {
        description: "Success",
        model: 'PendingUserActionResponse'
      },
      400: {
        description: "Validation error",
      },
      500: {
        description: "Internal Server Error",
      },
    },
  })
  async invoke(req: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new PendingUserQuery({
        userId: req.params.userId
      }),
    );

    res.json(queryResult.result);
  }
}
export default PendingUserAction;

@ApiModel({
  name: "PendingUserActionResponse",
})
export class PendingUserActionResponse {
  @ApiModelProperty({})
  id: string;

  @ApiModelProperty({})
  email: string;

  @ApiModelProperty({})
  type: UserBaseType;

  @ApiModelProperty({})
  createdAt: Date;

  @ApiModelProperty({})
  updatedAt: Date;
}
