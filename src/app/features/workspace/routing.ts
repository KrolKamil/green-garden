import * as express from "express";

// VALIDATION_IMPORTS

export interface WorkspaceRoutingDependencies {
  // ACTIONS_IMPORTS
}

export const workspaceRouting = (_actions: WorkspaceRoutingDependencies) => {
  const router = express.Router();

  // ACTIONS_SETUP

  return router;
};
