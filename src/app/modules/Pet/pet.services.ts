import { Pet, PetSpecies, Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import pagination from "../../utils/pagination";
import { petSearchAbleFields } from "./pet.constant";

const getAllPetsFromDB = async (
  params: Record<string, unknown>,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = pagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.PetWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: petSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => {
        if (key === "age") {
          return {
            [key]: {
              equals: Number((filterData as any)[key]),
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditons: Prisma.PetWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  const result = await prisma.pet.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.pet.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createPetIntoDB = async (payload: Pet) => {
  const species = (payload.species.toLowerCase().charAt(0).toUpperCase() +
    payload.species.slice(1)) as PetSpecies;
  const result = await prisma.pet.create({
    data: { ...payload, species },
  });

  return result;
};

const updatePetIntoDB = async (id: string, payload: Partial<Pet>) => {
  const petData = await prisma.pet.findUniqueOrThrow({
    where: { id },
  });

  const species = payload.species
    ? ((payload.species.toLowerCase().charAt(0).toUpperCase() +
        payload.species.slice(1)) as PetSpecies)
    : petData.species;

  const result = await prisma.pet.update({
    where: {
      id,
    },
    data: {
      ...payload,
      species,
    },
  });

  return result;
};

export { getAllPetsFromDB, createPetIntoDB, updatePetIntoDB };
