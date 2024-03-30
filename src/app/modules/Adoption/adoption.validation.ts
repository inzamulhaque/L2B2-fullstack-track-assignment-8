import { ReqStatus } from "@prisma/client";
import { z } from "zod";

const requestAdoptionValidationSchema = z.object({
  body: z.object({
    petId: z.string({ required_error: "Pet ID is required." }),
    petOwnershipExperience: z.string({
      required_error: "Pet ownership experience is required.",
    }),
  }),
});

const acceptAdoptionRequestValidationSchema = z.object({
  body: z.object({
    status: z.enum([ReqStatus.PENDING, ReqStatus.APPROVED, ReqStatus.REJECTED]),
  }),
});

export {
  requestAdoptionValidationSchema,
  acceptAdoptionRequestValidationSchema,
};
