import { JwtPayload } from "jsonwebtoken";
import prisma from "../../utils/prisma";

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

export { createAdoptionRequestIntoDB };
