import { createReview, getReview } from "./reviewController";
import { Router } from "express";

const router = Router();

router.route("/").post(createReview);
router.route("/review/:id").get(getReview);

export default router;
