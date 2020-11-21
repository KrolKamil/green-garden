import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { MyGardensQuery } from "../queries/my-gardens";
import { Action } from "../../../../shared/http/types";

export interface MyGardensActionDependencies {
  queryBus: QueryBus;
}

export const myGardensActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class MyGardensAction implements Action {
  constructor(private dependencies: MyGardensActionDependencies) {}

  @ApiOperationGet({
    path: "/gardens/my-gardens",
    description: "Description",
    responses: {
      200: {
        description: "Success",
        model: "MyGardensActionResponse",
        type: SwaggerDefinitionConstant.ARRAY,
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
      new MyGardensQuery({
        userId: res.locals.userDTO.id,
      }),
    );

    res.json(queryResult.result);
  }
}
export default MyGardensAction;

@ApiModel({
  name: "MyGardensActionResponse",
})
export class MyGardensActionResponse {
  @ApiModelProperty({})
  id: string;

  @ApiModelProperty({})
  publicId: string;

  @ApiModelProperty({})
  surfaceInSquareMeters: number;

  @ApiModelProperty({})
  includeWater: boolean;

  @ApiModelProperty({})
  includeElectricity: boolean;

  @ApiModelProperty({})
  includeGas: boolean;

  @ApiModelProperty({})
  createdAt: string;

  @ApiModelProperty({})
  updatedAt: string;
}
