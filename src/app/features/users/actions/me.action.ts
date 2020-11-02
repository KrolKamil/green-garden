import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { MeQuery } from "../queries/me";
import { Action } from "../../../../shared/http/types";

export interface MeActionDependencies {
  queryBus: QueryBus;
}

export const meActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class MeAction implements Action {
  constructor(private dependencies: MeActionDependencies) {}

  @ApiOperationGet({
    path: "/users/me",
    description: "Description",
    responses: {
      200: {
        description: "Success",
        model: "MeActionResponseModel",
      },
      400: {
        description: "Validation error",
      },
      500: {
        description: "Internal Server Error",
      },
    },
  })
  async invoke(_req: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new MeQuery({
        userId: res.locals.userDTO.id,
      }),
    );

    res.json(queryResult.result);
  }
}
export default MeAction;

@ApiModel({
  name: "MeActionResponseModel",
})
export class MeActionResponseModel {
  @ApiModelProperty({})
  id: string;

  @ApiModelProperty({})
  email: string;

  @ApiModelProperty({})
  name: string;

  @ApiModelProperty({})
  surname: string;

  @ApiModelProperty({})
  phone: string;

  @ApiModelProperty({})
  type: string;

  @ApiModelProperty({})
  active: string;

  @ApiModelProperty({})
  createdAt: string;

  @ApiModelProperty({})
  updatedAt: string;
}
