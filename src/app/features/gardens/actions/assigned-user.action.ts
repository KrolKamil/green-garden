import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModelProperty, SwaggerDefinitionConstant, ApiModel } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { AssignedUserQuery } from "../queries/assigned-user";
import { Action } from "../../../../shared/http/types";
import { UserBaseType } from "../../users/models/user-base.model";

export interface AssignedUserActionDependencies {
  queryBus: QueryBus;
}

export enum AssignedUserFilter {
  CURRENT = "current",
  HISTORICAL = "historical",
}

export const assignedUserActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: {
      filter: Joi.string()
        .valid(...Object.values(AssignedUserFilter))
        .optional(),
    },
    params: {
      gardenId: Joi.string().required(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class AssignedUserAction implements Action {
  constructor(private dependencies: AssignedUserActionDependencies) {}

  @ApiOperationGet({
    path: "/gardens/assigned-user",
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
        model: "AssignedUserActionResponse",
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
      new AssignedUserQuery({
        filter: (req.query.filter as AssignedUserFilter | null) || AssignedUserFilter.CURRENT,
        gardenId: req.params.gardenId,
      }),
    );

    res.json(queryResult.result);
  }
}
export default AssignedUserAction;

@ApiModel({
  name: "AssignedUserActionResponse",
})
export class AssignedUserActionResponse {
  @ApiModelProperty({})
  id: string;

  @ApiModelProperty({})
  email: string;

  @ApiModelProperty({})
  name: number;

  @ApiModelProperty({})
  surname: boolean;

  @ApiModelProperty({})
  type: UserBaseType;

  @ApiModelProperty({})
  active: boolean;

  @ApiModelProperty({
    itemType: SwaggerDefinitionConstant.Model.Property.Type.OBJECT,
  })
  assignedGardens: Object[];

  @ApiModelProperty({})
  createdAt: boolean;

  @ApiModelProperty({})
  updatedAt: boolean;
}
