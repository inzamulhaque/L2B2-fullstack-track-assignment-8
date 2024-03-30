import { JwtPayload } from "jsonwebtoken";
import prisma from "../../utils/prisma";
import { ReqStatus } from "@prisma/client";

const getAllAdoptionRequestFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany({});
  return result;
};

const createAdoptionRequestIntoDB = async (
  user: JwtPayload,
  payload: { petId: string; petOwnershipExperience: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: user.email },
  });

  const result = await prisma.adoptionRequest.create({
    data: { userId: userData.id, ...payload },
  });

  return result;
};

const updateRequestStatusIntoDB = async (
  id: string,
  payload: { status: ReqStatus }
) => {
  await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.adoptionRequest.update({
    where: {
      id,
    },
    data: {
      status: payload.status,
    },
  });

  return result;
};

export {
  getAllAdoptionRequestFromDB,
  createAdoptionRequestIntoDB,
  updateRequestStatusIntoDB,
};
