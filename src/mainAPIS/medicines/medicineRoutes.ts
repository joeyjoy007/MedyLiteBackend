import { createMedicine, getAllMedicines } from "./medicineController";
import { Router } from "express";
import protect from "../../helpers/authentication";

const router = Router();

router.post("/", protect, createMedicine);
// router.get('/',redis_data,getAllMedicines)
router.get("/", protect, getAllMedicines);
router.patch("/:id");
router.delete("/:id");

export default router;
