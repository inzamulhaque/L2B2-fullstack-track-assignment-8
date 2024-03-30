import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";
import prisma from "../../utils/prisma";
import { JwtPayload } from "jsonwebtoken";

const getProfileInfoFromDB = async (user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return userData;
};

const createUserIntoDB = async (payload: User) => {
  const hashedPassword: string = await bcrypt.hash(
    payload.password as string,
    Number(config.password_solt)
  );

  const userData = { ...payload, password: hashedPassword };

  const result = await prisma.user.create({
    data: userData,
  });

  const { password, ...res } = result;
  return res;
};

const updateUserIntoDB = async (user: JwtPayload, payload: Partial<User>) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: payload,
  });

  const { password, ...res } = result;
  return res;
};

export { createUserIntoDB, getProfileInfoFromDB, updateUserIntoDB };
