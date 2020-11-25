import * as express from "express";
import { Action } from "../../../shared/http/types";

import { publishNoticeActionValidation } from "./actions/publish-notice.action";
import { MiddlewareType } from "../../../../src/shared/middleware-type/middleware.type";
import { CreateAuthorizationMiddleware } from "../../../../src/middleware/authorization";
import { UserBaseType } from "../users/models/user-base.model";
import { getNoticeActionValidation } from "./actions/get-notice.action";
// VALIDATION_IMPORTS

export interface NoticeRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  publishNoticeAction: Action;
  getNoticeAction: Action;
  // ACTIONS_IMPORTS
}

export const noticeRouting = (actions: NoticeRoutingDependencies) => {
  const { authenticationMiddleware, createAuthorizationMiddleware } = actions;
  const router = express.Router();

  router.post("/publish-notice", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    publishNoticeActionValidation], actions.publishNoticeAction.invoke.bind(actions.publishNoticeAction));
  router.get("/:noticeId/get-notice", [authenticationMiddleware, getNoticeActionValidation], actions.getNoticeAction.invoke.bind(actions.getNoticeAction));
  // ACTIONS_SETUP

  return router;
};
