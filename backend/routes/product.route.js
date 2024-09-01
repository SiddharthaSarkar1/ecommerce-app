import express from "express";

import { getAllProducts } from "../controllers/product.controller.js";

const router = express.Route();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);

export default router;
