import { ZodError, ZodIssue } from "zod";

import httpStatus from "http-status";

const handleZodError = (err: ZodError) => {
  const errorDetails = err.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue?.path.length - 1],
      message: issue.message,
    };
  });

  const message = errorDetails.map((error) => `${error.message}`).join(" ");

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message,
    errorDetails,
  };
};

export default handleZodError;
