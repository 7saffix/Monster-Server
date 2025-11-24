import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/register", userController.userRegister);
router.get("/profile", checkAuth(), userController.getMe);

export const userRoutes = router;
