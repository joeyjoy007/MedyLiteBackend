import { Router } from "express";
import protect from "../../helpers/authentication";
import { createMedicineList, getAllMedicine, updateInALlMedicine } from "./OTCMedicineController";

const router = Router();

router.post("/", protect, createMedicineList);
router.get("/", getAllMedicine);
router.patch("/:id");
router.delete("/:id");
router.put("/update",updateInALlMedicine);

export default router;
