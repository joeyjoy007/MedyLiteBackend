import { createReview,  getParticularShopReview,  getShopReview } from "./reviewController";
import { Router } from "express";

const router = Router();

router.route("/").post(createReview);
router.route("/review/:id").get(getShopReview);
router.route("/shopReview").post(getParticularShopReview);

export default router;
