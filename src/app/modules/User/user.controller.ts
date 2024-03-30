import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createUserIntoDB,
  getProfileInfoFromDB,
  updateUserIntoDB,
} from "./user.services";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

const getProfile = catchAsync(async (req: Request & JwtPayload, res) => {
  // call get profile service function for get profile info from DB
  const result = await getProfileInfoFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

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

const updateUser = catchAsync(async (req: Request & JwtPayload, res) => {
  // call update user service function for updating user info into DB
  const result = await updateUserIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export { createUser, getProfile, updateUser };
