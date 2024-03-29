import { z } from "zod";

const requestAdoptionValidationSchema = z.object({
  body: z.object({
    petId: z.string({ required_error: "Pet ID is required." }),
    petOwnershipExperience: z.string({
      required_error: "Pet ownership experience is required.",
    }),
  }),
});

export { requestAdoptionValidationSchema };
