import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { ApiOperationGet, ApiPath, ApiModel, ApiModelProperty } from "swagger-express-ts";
import { QueryBus } from "../../../../shared/query-bus";
import { GetNoticeQuery } from "../queries/get-notice";
import { Action } from "../../../../shared/http/types";
import { NoticeType } from "../models/notice.model";

export interface GetNoticeActionDependencies {
  queryBus: QueryBus;
}

export const getNoticeActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: {
      noticeId: Joi.string().required()
    }
  },
  { abortEarly: false },
);

@ApiPath({
  path: "/api",
  name: "notice",
})
class GetNoticeAction implements Action {
  constructor(private dependencies: GetNoticeActionDependencies) {}

  @ApiOperationGet({
    path: "/notice/get-notice",
    description: "Description",
    responses: {
      200: {
        description: "Success",
        model: 'GetNoticeActionResponse'
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
      new GetNoticeQuery({
        noticeId: req.params.noticeId
      }),
    );

    res.json(queryResult.result);
  }
}
export default GetNoticeAction;

@ApiModel({
  name: "GetNoticeActionResponse",
})
export class GetNoticeActionResponse {
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
  createdAt: Date;

  @ApiModelProperty({})
  updatedAt: Date;
}
