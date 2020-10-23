import * as express from "express";
import { Action } from "../../../shared/http/types";

import { loginActionValidation } from "./actions/login.action";
import { registerUserActionValidation } from "./actions/register-user.action";
import { registerManagerActionValidation } from "./actions/register-manager.action";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  loginAction: Action;
  registerUserAction: Action;
  registerManagerAction: Action;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  router.post("/login", [loginActionValidation], actions.loginAction.invoke.bind(actions.loginAction));
  router.post("/register-user", [registerUserActionValidation], actions.registerUserAction.invoke.bind(actions.registerUserAction));
  router.post("/register-manager", [registerManagerActionValidation], actions.registerManagerAction.invoke.bind(actions.registerManagerAction));
  // ACTIONS_SETUP

  return router;
};
