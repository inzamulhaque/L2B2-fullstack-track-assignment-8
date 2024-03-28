import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createPet = catchAsync(async (req, res) => {
  // call create user service function for creating user into DB
  // const result = await createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: null,
  });
});

export { createPet };
