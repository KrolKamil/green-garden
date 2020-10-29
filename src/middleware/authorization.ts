// @todo

// import { Request, Response, NextFunction } from "express";
// import { UNAUTHORIZED } from "http-status-codes";
// import { AppError } from "../errors/app.error";
// import { HttpError } from "../errors/http.error";
// import { UserBaseType } from "../../src/app/features/users/models/user-base.model";

// interface MakeAuthorizationMiddlewareProps{
//     allowAccess?: UserBaseType[];
//     denyAccess?: UserBaseType[];
// }

// export const makeAuthorizationMiddleware = () => (props: MakeAuthorizationMiddlewareProps) => async <T>(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const {allowAccess, denyAccess} = props;
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(" ")[1];
//     if (!token) {
//       return next(new HttpError("Missing token", UNAUTHORIZED));
//     }
//     try {
//       const verified = tokenService.verifyAccessToken(token);
//       // eslint-disable-next-line no-param-reassign
//       res.locals.userDTO = verified;

//       return next();
//     } catch (e) {
//       return next(new HttpError("Invalid token", UNAUTHORIZED));
//     }
//   } catch (e) {
//     return next(new AppError("Internal error"));
//   }
// };
