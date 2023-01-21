import {
    createParentCategory,
    getParentCategoryName,
    parentCategoryById,
    updateImage,
} from "./parentMedicineController";
import { Router } from "express";
import protect from "../../helpers/authentication";

const router = Router();

router.post("/", protect, createParentCategory);
router.get("/", getParentCategoryName);
router.post("/parent", parentCategoryById);
router.patch("/:id");
router.delete("/:id");
router.put("/",updateImage);

export default router;
