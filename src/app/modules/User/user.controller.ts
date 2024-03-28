import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createUserIntoDB } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  // call create user service function for creating user into DB
  const result = await createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export { createUser };
