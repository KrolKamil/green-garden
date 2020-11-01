import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { ListQuery } from "../queries/list";
import { Action } from "../../../../shared/http/types";

export interface ListActionDependencies {
  queryBus: QueryBus;
}

export const listActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class ListAction implements Action {
  constructor(private dependencies: ListActionDependencies) {}

  @ApiOperationGet({
    path: "/users/list",
    description: "Description",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'ListActionResponseModel'
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
      new ListQuery({
        // query props
      }),
    );

    res.json(queryResult.result);
  }
}
export default ListAction;


@ApiModel({
  name: "ListActionResponseModel",
})
export class ListActionResponseModel {
  @ApiModelProperty({})
  id: string;

  @ApiModelProperty({})
  email: string;

  @ApiModelProperty({})
  name: string;

  @ApiModelProperty({})
  surname: string;
}