import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { EditGardenCommand } from "../commands/edit-garden.command";
import { Action } from "../../../../shared/http/types";

export interface EditGardenActionDependencies {
  commandBus: CommandBus;
}

export const editGardenActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      id: Joi.string().required(),
      publicId: Joi.string().required(),
      surfaceInSquareMeters: Joi.number().min(0).required(),
      includeWater: Joi.boolean().optional(),
      includeElectricity: Joi.boolean().optional(),
      includeGas: Joi.boolean().optional() 
    }
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class EditGardenAction implements Action {
  constructor(private dependencies: EditGardenActionDependencies) {}

  @ApiOperationPost({
    path: "/gardens/edit-garden",
    description: "Description",
    parameters: {
      body: {
        model: 'EditGardenActionRequestModel'
      }
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
      new EditGardenCommand({
        id: body.id,
        publicId: body.publicId,
        surfaceInSquareMeters: body.surfaceInSquareMeters,
        includeWater: body.includeWater,
        includeElectricity: body.includeElectricity,
        includeGas: body.includeGas
      }),
    );

    res.json(commandResult.result);
  }
}
export default EditGardenAction;

@ApiModel({
  name: "EditGardenActionRequestModel",
})
export class EditGardenActionRequestModel {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  publicId: string;

  @ApiModelProperty()
  surfaceInSquareMeters: number;

  @ApiModelProperty()
  includeWater: boolean;

  @ApiModelProperty()
  includeElectricity: boolean;

  @ApiModelProperty()
  includeGas: boolean;
}
