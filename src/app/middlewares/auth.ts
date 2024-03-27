import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import { verifyToken } from "../utils/jwt.utils";
import AppError from "../errors/AppError";

const auth = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret);

    req.user = verifiedUser;

    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
