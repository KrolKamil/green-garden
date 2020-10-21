import * as express from "express";

export interface RoutingDependencies {
  usersRouting: express.Router;
  workspaceRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  usersRouting,
  workspaceRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/users", usersRouting);
  router.use("/workspace", workspaceRouting);
  // ROUTES_CONFIG
  return router;
};
