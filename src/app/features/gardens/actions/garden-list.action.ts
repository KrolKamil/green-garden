import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
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
      new GardenListQuery({}),
    );

    res.json(queryResult.result);
  }
}
export default GardenListAction;
