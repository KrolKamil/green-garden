import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";
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
        userId: res.locals.userDTO.id
      }),
    );

    res.json(queryResult.result);
  }
}
export default MyGardensAction;
