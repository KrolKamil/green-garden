import * as express from "express";

export interface RoutingDependencies {
  usersRouting: express.Router;
  gardensRouting: express.Router;
  noticeRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  usersRouting,
  gardensRouting,
  noticeRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/users", usersRouting);
  router.use("/gardens", gardensRouting);
  router.use("/notice", noticeRouting);
  // ROUTES_CONFIG
  return router;
};
