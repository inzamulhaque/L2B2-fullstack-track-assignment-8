import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";
import { createUser, getProfile } from "./user.controller";
import auth from "../../middlewares/auth";

const router: Router = Router();

router.get("/profile", auth, getProfile);

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  createUser
);

const UserRoutes = router;

export default UserRoutes;
