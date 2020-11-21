import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { UnassignGardenCommand } from "../commands/unassign-garden.command";
import { Action } from "../../../../shared/http/types";

export interface UnassignGardenActionDependencies {
  commandBus: CommandBus;
}

export const unassignGardenActionValidation = celebrate(
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
class UnassignGardenAction implements Action {
  constructor(private dependencies: UnassignGardenActionDependencies) {}

  @ApiOperationPost({
    path: "/gardens/unassign-garden",
    description: "Description",
    parameters: {
      body: {
        model: "UnassignGardenActionRequest",
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
      new UnassignGardenCommand({
        ...body,
      }),
    );

    res.json(commandResult.result);
  }
}
export default UnassignGardenAction;

@ApiModel({
  name: "UnassignGardenActionRequest",
})
export class UnassignGardenActionRequest {
  @ApiModelProperty({})
  userId: string;

  @ApiModelProperty({})
  gardenId: string;
}
