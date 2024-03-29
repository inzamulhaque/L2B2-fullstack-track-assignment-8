import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { createPetIntoDB, getAllPetsFromDB } from "./pet.services";
import pickFields from "../../utils/pickFields";
import { petFilterableFields, petPaginationOption } from "./pet.constant";

const getAllPets = catchAsync(async (req, res) => {
  // validate options and fields
  const filters = pickFields(req.query, petFilterableFields);
  const options = pickFields(req.query, petPaginationOption);

  // call create pet service function for add pet info into DB
  const result = await getAllPetsFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pets retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const createPet = catchAsync(async (req, res) => {
  // call create pet service function for add pet info into DB
  const result = await createPetIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Pet added successfully",
    data: result,
  });
});

export { getAllPets, createPet };
