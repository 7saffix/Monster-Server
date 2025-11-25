import { Router } from "express";
import { productController } from "./product.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/create", checkAuth(Role.ADMIN), productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/best-seller", productController.getBestSellerProduct);
router.get("/new-arrival", productController.newArrivalProduct);
router.get("/:id", productController.getProductDetails);
router.get("/similar/:id", productController.getSimilarProduct);
router.patch("/:id", checkAuth(Role.ADMIN), productController.updateProduct);

export const productRoutes = router;
