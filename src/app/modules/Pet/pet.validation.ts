import { PetSpecies } from "@prisma/client";
import { z } from "zod";

const createPetValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Pet name is required." }),
    species: z
      .string()
      .transform((val) => {
        const lowerVal = val.toLowerCase();
        if (["dog", "cat", "bird"].includes(lowerVal)) {
          return lowerVal.charAt(0).toUpperCase() + lowerVal.slice(1);
        }
        return val;
      })
      .refine((val) => ["Dog", "Cat", "Bird"].includes(val), {
        message: "Species must be 'Dog', 'Cat', or 'Bird'.",
      }),
    breed: z.string({ required_error: "Breed is required." }),
    age: z.number({ required_error: "Age is required." }),
    size: z.string({ required_error: "Size is required" }),
    location: z.string({ required_error: "Location is required." }),
    description: z.string({ required_error: "Description is required." }),
    temperament: z.string({ required_error: "Temperament is required." }),
    medicalHistory: z.string({
      required_error: "Medical history is required.",
    }),
    adoptionRequirements: z.string({
      required_error: "Adoption requirements is required.",
    }),
  }),
});

const updatePetValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    species: z
      .string()
      .transform((val) => {
        const lowerVal = val.toLowerCase();
        if (["dog", "cat", "bird"].includes(lowerVal)) {
          return lowerVal.charAt(0).toUpperCase() + lowerVal.slice(1);
        }
        return val;
      })
      .refine((val) => ["Dog", "Cat", "Bird"].includes(val), {
        message: "Species must be 'Dog', 'Cat', or 'Bird'.",
      })
      .optional(),
    breed: z.string().optional(),
    age: z.number().optional(),
    size: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    medicalHistory: z.string().optional(),
    adoptionRequirements: z.string().optional(),
  }),
});

export { createPetValidationSchema, updatePetValidationSchema };
