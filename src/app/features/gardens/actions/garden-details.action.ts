import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { GardenDetailsQuery } from "../queries/garden-details";
import { Action } from "../../../../shared/http/types";

export interface GardenDetailsActionDependencies {
  queryBus: QueryBus;
}

export const gardenDetailsActionValidation = celebrate(
  {
    headers: Joi.object()
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class GardenDetailsAction implements Action {
  constructor(private dependencies: GardenDetailsActionDependencies) {}

  @ApiOperationGet({
    path: "/gardens/garden-details",
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
      new GardenDetailsQuery({
        gardenId: req.params.gardenId,
        userDTO: res.locals.userDTO
      }),
    );

    res.json(queryResult.result);
  }
}
export default GardenDetailsAction;
