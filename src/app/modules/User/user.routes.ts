import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";
import { createUser } from "./user.controller";

const router: Router = Router();

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  createUser
);

const UserRoutes = router;

export default UserRoutes;
