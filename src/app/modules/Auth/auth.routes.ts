import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { login } from "./auth.controller";
import { loginValidationSchema } from "./auth.validation";

const router: Router = Router();

router.post("/login", validateRequest(loginValidationSchema), login);

const AuthRoutes = router;

export default AuthRoutes;
