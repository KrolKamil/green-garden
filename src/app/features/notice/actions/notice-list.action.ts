import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { NoticeListQuery } from "../queries/notice-list";
import { Action } from "../../../../shared/http/types";
import { NoticeType } from "../models/notice.model";

export interface NoticeListActionDependencies {
  queryBus: QueryBus;
}

export const noticeListActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "notice",
})
class NoticeListAction implements Action {
  constructor(private dependencies: NoticeListActionDependencies) {}

  @ApiOperationGet({
    path: "/notice/notice-list",
    description: "Description",
    responses: {
      200: {
        description: "Success",
        model: "NoticeListActionResponse",
        type: SwaggerDefinitionConstant.ARRAY,
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
      new NoticeListQuery({
        // query props
      }),
    );

    res.json(queryResult.result);
  }
}
export default NoticeListAction;

@ApiModel({
  name: "NoticeListActionResponse",
})
export class NoticeListActionResponse {
  @ApiModelProperty({})
  id: string;

  @ApiModelProperty({})
  title: string;

  @ApiModelProperty({})
  content: string;

  @ApiModelProperty({
    enum: [...Object.values(NoticeType)],
  })
  type: NoticeType;

  @ApiModelProperty({})
  creator: Object;

  @ApiModelProperty({})
  createdAt: string;

  @ApiModelProperty({})
  updatedAt: string;
}
