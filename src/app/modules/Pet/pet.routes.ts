import { Router } from "express";
import auth from "../../middlewares/auth";
import { createPet } from "./pet.controller";

const router: Router = Router();

router.post("/pets", auth, createPet);

const PetRoutes = router;

export default PetRoutes;
