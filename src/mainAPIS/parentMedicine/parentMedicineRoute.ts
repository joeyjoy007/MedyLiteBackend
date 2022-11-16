import {
    createParentCategory,
    getParentCategoryName,
} from "./parentMedicineController";
import { Router } from "express";
import protect from "../../helpers/authentication";

const router = Router();

router.post("/", protect, createParentCategory);
router.get("/", getParentCategoryName);
router.patch("/:id");
router.delete("/:id");

export default router;
