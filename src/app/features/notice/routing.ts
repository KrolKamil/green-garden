import * as express from "express";
import { Action } from "../../../shared/http/types";

import { publishNoticeActionValidation } from "./actions/publish-notice.action";
import { MiddlewareType } from "../../../shared/middleware-type/middleware.type";
import { CreateAuthorizationMiddleware } from "../../../middleware/authorization";
import { UserBaseType } from "../users/models/user-base.model";
import { getNoticeActionValidation } from "./actions/get-notice.action";
import { editNoticeActionValidation } from "./actions/edit-notice.action";
import { deleteNoticeActionValidation } from "./actions/delete-notice.action";
import { noticeListActionValidation } from "./actions/notice-list.action";
// VALIDATION_IMPORTS

export interface NoticeRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  publishNoticeAction: Action;
  getNoticeAction: Action;
  editNoticeAction: Action;
  deleteNoticeAction: Action;
  noticeListAction: Action;
  // ACTIONS_IMPORTS
}

export const noticeRouting = (actions: NoticeRoutingDependencies) => {
  const { authenticationMiddleware, createAuthorizationMiddleware } = actions;
  const router = express.Router();

  router.post(
    "/publish-notice",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), publishNoticeActionValidation],
    actions.publishNoticeAction.invoke.bind(actions.publishNoticeAction),
  );
  router.get(
    "/:noticeId/get-notice",
    [authenticationMiddleware, getNoticeActionValidation],
    actions.getNoticeAction.invoke.bind(actions.getNoticeAction),
  );
  router.post(
    "/edit-notice",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), editNoticeActionValidation],
    actions.editNoticeAction.invoke.bind(actions.editNoticeAction),
  );
  router.post(
    "/delete-notice",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), deleteNoticeActionValidation],
    actions.deleteNoticeAction.invoke.bind(actions.deleteNoticeAction),
  );
  router.get(
    "/notice-list",
    [authenticationMiddleware, noticeListActionValidation],
    actions.noticeListAction.invoke.bind(actions.noticeListAction),
  );
  // ACTIONS_SETUP

  return router;
};
