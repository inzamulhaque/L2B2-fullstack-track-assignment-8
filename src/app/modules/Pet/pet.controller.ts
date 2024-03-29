import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { createPetIntoDB } from "./pet.services";

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

export { createPet };
