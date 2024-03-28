import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";
import prisma from "../../utils/prisma";

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

export { createUserIntoDB };
