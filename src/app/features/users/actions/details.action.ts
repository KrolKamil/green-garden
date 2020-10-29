import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { DetailsQuery } from "../queries/details";
import { Action } from "../../../../shared/http/types";

export interface DetailsActionDependencies {
  queryBus: QueryBus;
}

export const detailsActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class DetailsAction implements Action {
  constructor(private dependencies: DetailsActionDependencies) {}

  @ApiOperationGet({
    path: "/users/details",
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
      new DetailsQuery({
        userId: res.locals.userDTO.id
      }),
    );

    res.json(queryResult.result);
  }
}
export default DetailsAction;
