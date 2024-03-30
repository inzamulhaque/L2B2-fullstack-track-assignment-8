import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "./user.validation";
import { createUser, getProfile, updateUser } from "./user.controller";
import auth from "../../middlewares/auth";

const router: Router = Router();

router.get("/profile", auth, getProfile);

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  createUser
);

router.put(
  "/profile",
  auth,
  validateRequest(updateUserValidationSchema),
  updateUser
);

const UserRoutes = router;

export default UserRoutes;
