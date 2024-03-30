import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import {
  createAdoptionRequestIntoDB,
  getAllAdoptionRequestFromDB,
  updateRequestStatusIntoDB,
} from "./adoption.services";

const getAllAdoptionRequest = catchAsync(async (req, res) => {
  // call request for adoption pet service function for create new request into DB
  const result = await getAllAdoptionRequestFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

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

const acceptRequestAdoption = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  // call request for adoption pet service function for create new request into DB
  const result = await updateRequestStatusIntoDB(requestId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption request updated successfully",
    data: result,
  });
});

export { getAllAdoptionRequest, requestAdoption, acceptRequestAdoption };
