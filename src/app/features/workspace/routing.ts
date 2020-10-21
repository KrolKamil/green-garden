import * as express from "express";
import { Action } from "../../../shared/http/types";

// VALIDATION_IMPORTS

export interface WorkspaceRoutingDependencies {
  // ACTIONS_IMPORTS
}

export const workspaceRouting = (actions: WorkspaceRoutingDependencies) => {
  const router = express.Router();

  // ACTIONS_SETUP

  return router;
};
