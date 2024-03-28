import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { generateToken } from "../../utils/jwt";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const loginService = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Something Went Wrong");
  }

  const token = generateToken(
    {
      email: userData.email,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const { password, ...resUser } = userData;

  return { ...resUser, token };
};

export { loginService };
