import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { createAdoptionRequestIntoDB } from "./adoption.services";

const requestAdoption = catchAsync(async (req: Request & JwtPayload, res) => {
  // call request for adoption pet service function for create new request into DB
  const result = await createAdoptionRequestIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Adoption request submitted successfully",
    data: result,
  });
});

export { requestAdoption };
