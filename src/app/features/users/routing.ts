import * as express from "express";
import { Action } from "../../../shared/http/types";

import { loginActionValidation } from "./actions/login.action";
import { refreshAccessTokenActionValidation } from "./actions/refresh-access-token.action";
import { updateActionValidation } from "./actions/update.action";
import { MiddlewareType } from "../../../shared/middleware-type/middleware.type";
import { listActionValidation } from "./actions/list.action";
import { CreateAuthorizationMiddleware } from "../../../middleware/authorization";
import { UserBaseType } from "./models/user-base.model";
import { setNoteActionValidation } from "./actions/set-note.action";
import { meActionValidation } from "./actions/me.action";
import { detailsActionValidation } from "./actions/details.action";
import { setActiveActionValidation } from "./actions/set-active.action";
import { assignedGardensActionValidation } from "./actions/assigned-gardens.action";
import { inviteUserActionValidation } from "./actions/invite-user.action";
import { pendingUserActionValidation } from "./actions/pending-user.action";
import { registerActionValidation } from "./actions/register.action";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  loginAction: Action;
  refreshAccessTokenAction: Action;
  updateAction: Action;
  listAction: Action;
  setNoteAction: Action;
  meAction: Action;
  detailsAction: Action;
  setActiveAction: Action;
  assignedGardensAction: Action;
  inviteUserAction: Action;
  pendingUserAction: Action;
  registerAction: Action;
  inviteManagerAction: Action;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const { authenticationMiddleware, createAuthorizationMiddleware } = actions;
  const router = express.Router();

  router.post("/login", [loginActionValidation], actions.loginAction.invoke.bind(actions.loginAction));
  router.post("/register", [registerActionValidation], actions.registerAction.invoke.bind(actions.registerAction));
  router.post(
    "/refresh-access-token",
    [refreshAccessTokenActionValidation],
    actions.refreshAccessTokenAction.invoke.bind(actions.refreshAccessTokenAction),
  );
  router.post(
    "/update",
    [authenticationMiddleware, updateActionValidation],
    actions.updateAction.invoke.bind(actions.updateAction),
  );
  router.get(
    "/list",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), listActionValidation],
    actions.listAction.invoke.bind(actions.listAction),
  );
  router.post(
    "/set-note",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), setNoteActionValidation],
    actions.setNoteAction.invoke.bind(actions.setNoteAction),
  );
  router.get("/me", [authenticationMiddleware, meActionValidation], actions.meAction.invoke.bind(actions.meAction));
  router.get(
    "/:userId/details",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), detailsActionValidation],
    actions.detailsAction.invoke.bind(actions.detailsAction),
  );
  router.post(
    "/set-active",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), setActiveActionValidation],
    actions.setActiveAction.invoke.bind(actions.setActiveAction),
  );
  router.get(
    "/:userId/assigned-gardens",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), assignedGardensActionValidation],
    actions.assignedGardensAction.invoke.bind(actions.assignedGardensAction),
  );
  router.post(
    "/invite-user",
    [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]), inviteUserActionValidation],
    actions.inviteUserAction.invoke.bind(actions.inviteUserAction),
  );
  router.get(
    "/:userId/pending-user",
    [pendingUserActionValidation, authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER])],
    actions.pendingUserAction.invoke.bind(actions.pendingUserAction),
  );
  // ACTIONS_SETUP

  return router;
};
