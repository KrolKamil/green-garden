import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModelProperty } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { DetailsQuery } from "../queries/details";
import { Action } from "../../../../shared/http/types";
import { UserNoteModel } from "../models/user-note.model";

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
    path: "/users/{userId}/details",
    description: "Description",
    responses: {
      200: {
        description: "Success",
        model: "DetailsActionResponseModel",
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
      new DetailsQuery({
        userId: req.params.userId,
      }),
    );

    res.json(queryResult.result);
  }
}
export default DetailsAction;

export class DetailsActionResponseModel {
  @ApiModelProperty({})
  id: string;

  @ApiModelProperty({})
  email: string;

  @ApiModelProperty({})
  name: string;

  @ApiModelProperty({})
  surname: string;

  @ApiModelProperty({})
  phone: string;

  @ApiModelProperty({})
  type: string;

  @ApiModelProperty({})
  active: string;

  @ApiModelProperty({})
  createdAt: string;

  @ApiModelProperty({})
  updatedAt: string;

  @ApiModelProperty({})
  userNote: UserNoteModel;
}
