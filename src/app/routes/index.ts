import { Router } from "express";
import UserRoutes from "../modules/User/user.routes";
import AuthRoutes from "../modules/Auth/auth.routes";
import PetRoutes from "../modules/Pet/pet.routes";
import AdoptionRoutes from "../modules/Adoption/adoption.routers";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/api",
    route: UserRoutes,
  },
  {
    path: "/api",
    route: AuthRoutes,
  },
  {
    path: "/api",
    route: PetRoutes,
  },
  {
    path: "/api",
    route: AdoptionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
