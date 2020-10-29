import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { UpdateCommand } from "../commands/update.command";
import { Action } from "../../../../shared/http/types";

export interface UpdateActionDependencies {
  commandBus: CommandBus;
}

export const updateActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object({
      name: Joi.string().max(60).optional(),
      surname: Joi.string().max(60).optional(),
      phone: Joi.string().max(20).optional()
    }).min(1)
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "users",
})
class UpdateAction implements Action {
  constructor(private dependencies: UpdateActionDependencies) {}

  @ApiOperationPost({
    path: "/users/update",
    description: "Description",
    parameters: {
      body: {model: 'UpdateRequestModel'}
    },
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
  async invoke({ body }: Request, res: Response) {
    const commandResult = await this.dependencies.commandBus.execute(
      new UpdateCommand({
        userId: res.locals.userDTO.id,
        ...body
      }),
    );

    res.json(commandResult.result);
  }
}
export default UpdateAction;

@ApiModel({
  name: "UpdateRequestModel",
})
export class UpdateRequestModel {
  @ApiModelProperty({
    required: false,
  })
  name: string;

  @ApiModelProperty({
    required: false,
  })
  surname: string;

  @ApiModelProperty({
    required: false,
  })
  phone: string;
}