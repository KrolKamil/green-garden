import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { AssignGardenCommand } from "../commands/assign-garden.command";
import { Action } from "../../../../shared/http/types";

export interface AssignGardenActionDependencies {
  commandBus: CommandBus;
}

export const assignGardenActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      userId: Joi.string().required(),
      gardenId: Joi.string().required(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class AssignGardenAction implements Action {
  constructor(private dependencies: AssignGardenActionDependencies) {}

  @ApiOperationPost({
    path: "/gardens/assign-garden",
    description: "Description",
    parameters: {
      body: {
        model: "AssignGardenActionRequest",
      },
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
      new AssignGardenCommand({
        ...body,
      }),
    );

    res.json(commandResult.result);
  }
}
export default AssignGardenAction;

@ApiModel({
  name: "AssignGardenActionRequest",
})
export class AssignGardenActionRequest {
  @ApiModelProperty({
    required: true,
  })
  userId: string;

  @ApiModelProperty({
    required: true,
  })
  gardenId: string;
}
