import * as express from "express";
import { Action } from "../../../shared/http/types";

import { loginActionValidation } from "./actions/login.action";
import { registerActionValidation } from "./actions/register.action";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  loginAction: Action;
  testAction: Action;
  test2Action: Action;
  registerAction: Action;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  router.post("/login", [loginActionValidation], actions.loginAction.invoke.bind(actions.loginAction));
  router.post("/register", [registerActionValidation], actions.registerAction.invoke.bind(actions.registerAction));
  // ACTIONS_SETUP

  return router;
};
