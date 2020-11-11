import * as express from "express";
import { Action } from "../../../shared/http/types";

import { createGardenActionValidation } from "./actions/create-garden.action";
import { MiddlewareType } from "../../../shared/middleware-type/middleware.type";
import { CreateAuthorizationMiddleware } from "../../../middleware/authorization";
import { UserBaseType } from "../users/models/user-base.model";
import { editGardenActionValidation } from "./actions/edit-garden.action";
import { assignGardenActionValidation } from "./actions/assign-garden.action";
import { unassignGardenActionValidation } from "./actions/unassign-garden.action";
import { gardenSetActiveActionValidation } from "./actions/garden-set-active.action";
// VALIDATION_IMPORTS

export interface GardensRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  createGardenAction: Action;
  editGardenAction: Action;
  assignGardenAction: Action;
  unassignGardenAction: Action;
  gardenSetActiveAction: Action;
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
  router.post("/assign-garden", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    assignGardenActionValidation], actions.assignGardenAction.invoke.bind(actions.assignGardenAction));
  router.post("/unassign-garden", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    unassignGardenActionValidation], actions.unassignGardenAction.invoke.bind(actions.unassignGardenAction));
  router.post("/garden-set-active", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    gardenSetActiveActionValidation], actions.gardenSetActiveAction.invoke.bind(actions.gardenSetActiveAction));
  // ACTIONS_SETUP

  return router;
};
