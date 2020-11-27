import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationPost, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { CommandBus } from "../../../../shared/command-bus";
import { CreateGardenCommand } from "../commands/create-garden.command";
import { Action } from "../../../../shared/http/types";

export interface CreateGardenActionDependencies {
  commandBus: CommandBus;
}

export const createGardenActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      publicId: Joi.string().required(),
      surfaceInSquareMeters: Joi.number().min(0).required(),
      includeWater: Joi.boolean().optional(),
      includeElectricity: Joi.boolean().optional(),
      includeGas: Joi.boolean().optional(),
    },
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "gardens",
})
class CreateGardenAction implements Action {
  constructor(private dependencies: CreateGardenActionDependencies) {}

  @ApiOperationPost({
    path: "/gardens/create-garden",
    description: "Description",
    parameters: {
      body: {
        model: "CreateGardenActionRequestModel",
      },
    },
    responses: {
      200: {
        description: "Success",
        model: "CreateGardenActionResponse",
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
      new CreateGardenCommand({
        publicId: body.publicId,
        surfaceInSquareMeters: body.surfaceInSquareMeters,
        includeWater: body.includeWater || false,
        includeElectricity: body.includeElectricity || false,
        includeGas: body.includeGas || false,
      }),
    );

    res.json(commandResult.result);
  }
}
export default CreateGardenAction;

@ApiModel({
  name: "CreateGardenActionRequestModel",
})
export class CreateGardenActionRequestModel {
  @ApiModelProperty({
    required: true,
  })
  publicId: string;

  @ApiModelProperty({
    required: true,
  })
  surfaceInSquareMeters: number;

  @ApiModelProperty({
    required: false,
  })
  includeWater: boolean;

  @ApiModelProperty({
    required: false,
  })
  includeElectricity: boolean;

  @ApiModelProperty({
    required: false,
  })
  includeGas: boolean;
}

@ApiModel({
  name: "CreateGardenActionResponse",
})
export class CreateGardenActionResponse {
  @ApiModelProperty({})
  id: string;

  @ApiModelProperty({})
  publicId: string;

  @ApiModelProperty({})
  surfaceInSquareMeters: number;

  @ApiModelProperty({})
  includeWater: boolean;

  @ApiModelProperty({})
  includeElectricity: boolean;

  @ApiModelProperty({})
  includeGas: boolean;

  @ApiModelProperty({})
  createdAt: string;

  @ApiModelProperty({})
  updatedAt: string;
}
