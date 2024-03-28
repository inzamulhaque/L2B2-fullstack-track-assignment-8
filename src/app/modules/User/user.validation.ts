import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name field is required.",
      })
      .min(1)
      .max(255),
    email: z
      .string({
        required_error: "Email must be a valid email address.",
      })
      .email(),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters long." })
      .max(20, { message: "password must not exceed 20 characters." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{0,9}$/, {
        message:
          "password must contain at least one uppercase letter, one lowercase letter, and one number.",
      }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    email: z.string().email().optional(),
  }),
});

export { createUserValidationSchema, updateUserValidationSchema };
