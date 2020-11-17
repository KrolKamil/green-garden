import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { AssignedGardensQuery } from "../queries/assigned-gardens";
import { Action } from "../../../../shared/http/types";

export interface AssignedGardensActionDependencies {
  queryBus: QueryBus;
}

export enum AssignedGardensFilter {
  CURRENT = 'current',
  HISTORICAL = 'historical'
}

export const assignedGardensActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: {
      filter: Joi.string().valid(...Object.values(AssignedGardensFilter)).optional()
    },
    params: {
      userId: Joi.string().required()
    }
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
    path: "/users/assigned-gardens",
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
      new AssignedGardensQuery({
        filter: req.query.filter as AssignedGardensFilter | null || AssignedGardensFilter.CURRENT,
        userId: req.params.userId
      }),
    );

    res.json(queryResult.result);
  }
}
export default AssignedGardensAction;
