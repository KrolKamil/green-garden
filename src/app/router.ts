import * as express from "express";

export interface RoutingDependencies {
  usersRouting: express.Router;
  gardensRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  usersRouting,
  gardensRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/users", usersRouting);
  router.use("/gardens", gardensRouting);
  // ROUTES_CONFIG
  return router;
};
