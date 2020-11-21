import * as express from "express";
import { Action } from "../../../shared/http/types";

import { loginActionValidation } from "./actions/login.action";
import { registerUserActionValidation } from "./actions/register-user.action";
import { registerManagerActionValidation } from "./actions/register-manager.action";
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
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  loginAction: Action;
  registerUserAction: Action;
  registerManagerAction: Action;
  refreshAccessTokenAction: Action;
  updateAction: Action;
  listAction: Action;
  setNoteAction: Action;
  meAction: Action;
  detailsAction: Action;
  setActiveAction: Action;
  assignedGardensAction: Action;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const { authenticationMiddleware, createAuthorizationMiddleware } = actions;
  const router = express.Router();

  router.post("/login", [loginActionValidation], actions.loginAction.invoke.bind(actions.loginAction));
  router.post(
    "/register-user",
    [registerUserActionValidation],
    actions.registerUserAction.invoke.bind(actions.registerUserAction),
  );
  router.post(
    "/register-manager",
    [registerManagerActionValidation],
    actions.registerManagerAction.invoke.bind(actions.registerManagerAction),
  );
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
  // ACTIONS_SETUP

  return router;
};
