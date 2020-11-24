import * as express from "express";
import { Action } from "../../../shared/http/types";

import { publishNoticeActionValidation } from "./actions/publish-notice.action";
import { MiddlewareType } from "../../../../src/shared/middleware-type/middleware.type";
import { CreateAuthorizationMiddleware } from "../../../../src/middleware/authorization";
import { UserBaseType } from "../users/models/user-base.model";
// VALIDATION_IMPORTS

export interface NoticeRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  publishNoticeAction: Action;
  // ACTIONS_IMPORTS
}

export const noticeRouting = (actions: NoticeRoutingDependencies) => {
  const { authenticationMiddleware, createAuthorizationMiddleware } = actions;
  const router = express.Router();

  router.post("/publish-notice", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    publishNoticeActionValidation], actions.publishNoticeAction.invoke.bind(actions.publishNoticeAction));
  // ACTIONS_SETUP

  return router;
};
