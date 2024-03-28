import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginService } from "./auth.services";

const login = catchAsync(async (req, res) => {
  // call login  service function for get JWT token
  const result = await loginService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export { login };
