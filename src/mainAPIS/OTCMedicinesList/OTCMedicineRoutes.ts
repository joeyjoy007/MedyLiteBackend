import { Router } from "express";
import protect from "../../helpers/authentication";
import { createMedicineList, getAllMedicine } from "./OTCMedicineController";

const router = Router();

router.post("/", protect, createMedicineList);
router.get("/", getAllMedicine);
router.patch("/:id");
router.delete("/:id");

export default router;
