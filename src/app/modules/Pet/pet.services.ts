import { Pet, PetSpecies } from "@prisma/client";
import prisma from "../../utils/prisma";

const createPetIntoDB = async (payload: Pet) => {
  const species = (payload.species.toLowerCase().charAt(0).toUpperCase() +
    payload.species.slice(1)) as PetSpecies;
  const result = await prisma.pet.create({
    data: { ...payload, species },
  });

  return result;
};

export { createPetIntoDB };
