import { Router } from "express";
import UserRoutes from "../modules/User/user.routes";
import AuthRoutes from "../modules/Auth/auth.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
