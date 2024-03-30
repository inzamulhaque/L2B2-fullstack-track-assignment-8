import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  acceptAdoptionRequestValidationSchema,
  requestAdoptionValidationSchema,
} from "./adoption.validation";
import {
  acceptRequestAdoption,
  getAllAdoptionRequest,
  requestAdoption,
} from "./adoption.controller";

const router: Router = Router();

router.get("/adoption-requests", auth, getAllAdoptionRequest);

router.post(
  "/adoption-request",
  auth,
  validateRequest(requestAdoptionValidationSchema),
  requestAdoption
);

router.put(
  "/adoption-requests/:requestId",
  auth,
  validateRequest(acceptAdoptionRequestValidationSchema),
  acceptRequestAdoption
);

const AdoptionRoutes = router;

export default AdoptionRoutes;
