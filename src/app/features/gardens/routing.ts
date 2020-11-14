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
import { gardenListActionValidation } from "./actions/garden-list.action";
import { gardenSetNoteActionValidation } from "./actions/garden-set-note.action";
import { myGardensActionValidation } from "./actions/my-gardens.action";
// VALIDATION_IMPORTS

export interface GardensRoutingDependencies {
  authenticationMiddleware: MiddlewareType;
  createAuthorizationMiddleware: CreateAuthorizationMiddleware;
  createGardenAction: Action;
  editGardenAction: Action;
  assignGardenAction: Action;
  unassignGardenAction: Action;
  gardenSetActiveAction: Action;
  gardenListAction: Action;
  gardenSetNoteAction: Action;
  myGardensAction: Action;
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
  router.get("/garden-list", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    gardenListActionValidation], actions.gardenListAction.invoke.bind(actions.gardenListAction));
  router.post("/garden-set-note", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.MANAGER]),
    gardenSetNoteActionValidation], actions.gardenSetNoteAction.invoke.bind(actions.gardenSetNoteAction));
  router.get("/my-gardens", [
    authenticationMiddleware, createAuthorizationMiddleware([UserBaseType.USER]),
    myGardensActionValidation], actions.myGardensAction.invoke.bind(actions.myGardensAction));
  // ACTIONS_SETUP

  return router;
};
