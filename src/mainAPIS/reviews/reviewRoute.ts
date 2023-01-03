import { createReview,  getShopReview } from "./reviewController";
import { Router } from "express";

const router = Router();

router.route("/").post(createReview);
router.route("/review/:id").get(getShopReview);

export default router;
