import * as express from "express";
import { Action } from "../../../shared/http/types";

import { createGardenActionValidation } from "./actions/create-garden.action";
import { MiddlewareType } from "../../../shared/middleware-type/middleware.type";
import { CreateAuthorizationMiddleware } from "../../../middleware/authorization";
import { UserBaseType } from "../users/models/user-base.model";
import { editGardenActionValidation } from "./actions/edit-garden.action";
// VALIDATION_IMPORTS

export interface GardensRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  createGardenAction: Action;
  editGardenAction: Action;
}

export const gardensRouting = (actions: GardensRoutingDependencies) => {
  const {authenticationMiddleware, createAuthorizationMiddleware} = actions;
  const router = express.Router();
  
  router.post("/create-garden", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    createGardenActionValidation], actions.createGardenAction.invoke.bind(actions.createGardenAction));
  router.post("/edit-garden", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    editGardenActionValidation], actions.editGardenAction.invoke.bind(actions.editGardenAction));
  // ACTIONS_SETUP

  return router;
};
