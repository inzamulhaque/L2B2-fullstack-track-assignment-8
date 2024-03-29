import { Router } from "express";
import auth from "../../middlewares/auth";
import { createPet, getAllPets, updatePet } from "./pet.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createPetValidationSchema,
  updatePetValidationSchema,
} from "./pet.validation";

const router: Router = Router();

router.get("/pets", getAllPets);

router.post(
  "/pets",
  auth,
  validateRequest(createPetValidationSchema),
  createPet
);

router.put(
  "/pets/:petId",
  auth,
  validateRequest(updatePetValidationSchema),
  updatePet
);

const PetRoutes = router;

export default PetRoutes;
