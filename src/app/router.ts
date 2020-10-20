import * as express from "express";

export interface RoutingDependencies {
  // ROUTES_INTERFACE
}

export const createRouter = ({
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  // ROUTES_CONFIG
  return router;
};
