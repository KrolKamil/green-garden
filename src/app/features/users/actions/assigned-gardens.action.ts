import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModelProperty, SwaggerDefinitionConstant, ApiModel } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { AssignedGardensQuery } from "../queries/assigned-gardens";
import { Action } from "../../../../shared/http/types";

export interface AssignedGardensActionDependencies {
  queryBus: QueryBus;
}

export enum AssignedGardensFilter {
  CURRENT = "current",
  HISTORICAL = "historical",
}

export const assignedGardensActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: {
      filter: Joi.string()
        .valid(...Object.values(AssignedGardensFilter))
        .optional(),
    },
    params: {
      userId: Joi.string().required(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class AssignedGardensAction implements Action {
  constructor(private dependencies: AssignedGardensActionDependencies) {}

  @ApiOperationGet({
    path: "/users/{userId}/assigned-gardens",
    description: "Description",
    parameters: {
      query: {
        filter: {
          type: "string",
          description: "current or historical",
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        model: "AssignedGardensActionResponse",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
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
      new AssignedGardensQuery({
        filter: (req.query.filter as AssignedGardensFilter | null) || AssignedGardensFilter.CURRENT,
        userId: req.params.userId,
      }),
    );

    res.json(queryResult.result);
  }
}
export default AssignedGardensAction;

@ApiModel({
  name: "AssignedGardensActionResponse",
})
export class AssignedGardensActionResponse {
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
  active: boolean;

  @ApiModelProperty({
    itemType: SwaggerDefinitionConstant.Model.Property.Type.OBJECT,
  })
  assignedGardens: Object[];

  @ApiModelProperty({})
  createdAt: string;

  @ApiModelProperty({})
  updatedAt: string;
}
