import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { GardenSetActiveCommand } from "../commands/garden-set-active.command";
import { Action } from "../../../../shared/http/types";

export interface GardenSetActiveActionDependencies {
  commandBus: CommandBus;
}

export const gardenSetActiveActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      gardenId: Joi.string().required(),
      active: Joi.boolean().required()
    }
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class GardenSetActiveAction implements Action {
  constructor(private dependencies: GardenSetActiveActionDependencies) {}

  @ApiOperationPost({
    path: "/gardens/garden-set-active",
    description: "Description",
    parameters: {},
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
      new GardenSetActiveCommand({
        ...body
      }),
    );

    res.json(commandResult.result);
  }
}
export default GardenSetActiveAction;
