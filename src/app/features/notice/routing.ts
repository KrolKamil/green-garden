import * as express from "express";
import { Action } from "../../../shared/http/types";

import { publishNoticeActionValidation } from "./actions/publish-notice.action";
// VALIDATION_IMPORTS

export interface NoticeRoutingDependencies {
  publishNoticeAction: Action;
  // ACTIONS_IMPORTS
}

export const noticeRouting = (actions: NoticeRoutingDependencies) => {
  const router = express.Router();

  router.post("/publish-notice", [publishNoticeActionValidation], actions.publishNoticeAction.invoke.bind(actions.publishNoticeAction));
  // ACTIONS_SETUP

  return router;
};
