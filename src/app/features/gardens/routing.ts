import * as express from "express";
import { Action } from "../../../shared/http/types";

import { createGardenActionValidation } from "./actions/create-garden.action";
import { MiddlewareType } from "../../../shared/middleware-type/middleware.type";
import { CreateAuthorizationMiddleware } from "../../../middleware/authorization";
import { UserBaseType } from "../users/models/user-base.model";
// VALIDATION_IMPORTS

export interface GardensRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  createGardenAction: Action;
}

export const gardensRouting = (actions: GardensRoutingDependencies) => {
  const {authenticationMiddleware, createAuthorizationMiddleware} = actions;
  const router = express.Router();
  
  router.post("/create-garden", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    createGardenActionValidation], actions.createGardenAction.invoke.bind(actions.createGardenAction));
  // ACTIONS_SETUP

  return router;
};
