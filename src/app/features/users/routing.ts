import * as express from "express";
import { Action } from "../../../shared/http/types";

import { loginActionValidation } from "./actions/login.action";
import { registerUserActionValidation } from "./actions/register-user.action";
import { registerManagerActionValidation } from "./actions/register-manager.action";
import { refreshAccessTokenActionValidation } from "./actions/refresh-access-token.action";
import { updateActionValidation } from "./actions/update.action";
import { MiddlewareType } from "../../../../src/shared/middleware-type/middleware.type";
import { detailsActionValidation } from "./actions/details.action";
import { listActionValidation } from "./actions/list.action";
import { CreateAuthorizationMiddleware } from "../../../../src/middleware/authorization";
import { UserBaseType } from "./models/user-base.model";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  loginAction: Action;
  registerUserAction: Action;
  registerManagerAction: Action;
  refreshAccessTokenAction: Action;
  updateAction: Action;
  detailsAction: Action;
  listAction: Action;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const {authenticationMiddleware, createAuthorizationMiddleware} = actions;
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
  
  router.post("/update", [authenticationMiddleware, updateActionValidation], actions.updateAction.invoke.bind(actions.updateAction));
  router.get("/details", [authenticationMiddleware, detailsActionValidation], actions.detailsAction.invoke.bind(actions.detailsAction));
  router.get("/list", [authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]) ,listActionValidation], actions.listAction.invoke.bind(actions.listAction));
  // ACTIONS_SETUP

  return router;
};
