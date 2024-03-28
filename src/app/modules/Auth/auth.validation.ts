import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email must be a valid email address.",
      })
      .email(),
    password: z.string({
      required_error: "Password field is required.",
    }),
  }),
});

export { loginValidationSchema };
