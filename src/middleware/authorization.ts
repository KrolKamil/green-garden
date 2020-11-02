import { Request, Response, NextFunction } from "express";
import { FORBIDDEN } from "http-status-codes";
import { AppError } from "../errors/app.error";
import { HttpError } from "../errors/http.error";
import { UserBaseType } from "../app/features/users/models/user-base.model";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";

interface CreateAuthorizationMiddlewareProps {
  allowAccessUserTypes: UserBaseType[];
}

export type CreateAuthorizationMiddleware = (allowAccessUserTypes: UserBaseType[]) => MiddlewareType;

export const makeCreateAuthorizationMiddleware = () => (allowAccessUserTypes: UserBaseType[]) => async <T>(
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userBaseType = res.locals?.userDTO?.type as UserBaseType | null;
  if (!userBaseType) {
    return next(new AppError("Internal error"));
  }
  const hasAccess = allowAccessUserTypes.includes(userBaseType);

  if (hasAccess) {
    return next();
  }

  return next(new HttpError("Access denied", FORBIDDEN));
};
