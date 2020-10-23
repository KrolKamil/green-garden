import * as express from "express";
import { Action } from "../../../shared/http/types";

import { loginActionValidation } from "./actions/login.action";
import { registerActionValidation } from "./actions/register.action";
import { registerUserActionValidation } from "./actions/register-user.action";
import { registerManagerActionValidation } from "./actions/register-manager.action";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  loginAction: Action;
  testAction: Action;
  test2Action: Action;
  registerAction: Action;
  registerUserAction: Action;
  registerManagerAction: Action;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  router.post("/login", [loginActionValidation], actions.loginAction.invoke.bind(actions.loginAction));
  router.post("/register", [registerActionValidation], actions.registerAction.invoke.bind(actions.registerAction));
  router.post("/register-user", [registerUserActionValidation], actions.registerUserAction.invoke.bind(actions.registerUserAction));
  router.post("/register-manager", [registerManagerActionValidation], actions.registerManagerAction.invoke.bind(actions.registerManagerAction));
  // ACTIONS_SETUP

  return router;
};
