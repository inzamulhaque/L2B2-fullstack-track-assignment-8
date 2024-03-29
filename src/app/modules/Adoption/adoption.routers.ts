import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { requestAdoptionValidationSchema } from "./adoption.validation";
import { requestAdoption } from "./adoption.controller";

const router: Router = Router();

router.post(
  "/adoption-request",
  auth,
  validateRequest(requestAdoptionValidationSchema),
  requestAdoption
);

const AdoptionRoutes = router;

export default AdoptionRoutes;
