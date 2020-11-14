import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { GardenSetNoteCommand } from "../commands/garden-set-note.command";
import { Action } from "../../../../shared/http/types";

export interface GardenSetNoteActionDependencies {
  commandBus: CommandBus;
}

export const gardenSetNoteActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      gardenId: Joi.string().required(),
      content: Joi.string().max(200).required(),
    }
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class GardenSetNoteAction implements Action {
  constructor(private dependencies: GardenSetNoteActionDependencies) {}

  @ApiOperationPost({
    path: "/gardens/garden-set-note",
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
      new GardenSetNoteCommand({
        ...body
      }),
    );

    res.json(commandResult.result);
  }
}
export default GardenSetNoteAction;
