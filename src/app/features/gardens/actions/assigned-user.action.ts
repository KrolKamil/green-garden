import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { AssignedUserQuery } from "../queries/assigned-user";
import { Action } from "../../../../shared/http/types";

export interface AssignedUserActionDependencies {
  queryBus: QueryBus;
}

export enum AssignedUserFilter {
  CURRENT = 'current',
  HISTORICAL = 'historical'
}

export const assignedUserActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: {
      filter: Joi.string().valid(...Object.values(AssignedUserFilter)).optional()
    },
    params: {
      gardenId: Joi.string().required()
    }
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
  async invoke(req: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new AssignedUserQuery({
        filter: req.query.filter as AssignedUserFilter | null || AssignedUserFilter.CURRENT,
        gardenId: req.params.gardenId
      }),
    );

    res.json(queryResult.result);
  }
}
export default AssignedUserAction;
