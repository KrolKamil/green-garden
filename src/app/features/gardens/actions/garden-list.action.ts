import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { GardenListQuery } from "../queries/garden-list";
import { Action } from "../../../../shared/http/types";

export interface GardenListActionDependencies {
  queryBus: QueryBus;
}

export const gardenListActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class GardenListAction implements Action {
  constructor(private dependencies: GardenListActionDependencies) {}

  @ApiOperationGet({
    path: "/gardens/garden-list",
    description: "Description",
    responses: {
      200: {
        description: "Success",
        model: "GardenListActionResponse",
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
    const queryResult = await this.dependencies.queryBus.execute(new GardenListQuery({}));

    res.json(queryResult.result);
  }
}
export default GardenListAction;

@ApiModel({
  name: "GardenListActionResponse",
})
export class GardenListActionResponse {
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

  @ApiModelProperty({})
  isOccupied: boolean;
}
