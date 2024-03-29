import { Router } from "express";
import auth from "../../middlewares/auth";
import { createPet, getAllPets } from "./pet.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createPetValidationSchema } from "./pet.validation";

const router: Router = Router();

router.get("/pets", getAllPets);

router.post(
  "/pets",
  auth,
  validateRequest(createPetValidationSchema),
  createPet
);

const PetRoutes = router;

export default PetRoutes;
