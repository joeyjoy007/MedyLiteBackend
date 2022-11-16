import { createChemist, getAllChemist, loginUser } from "./chemistController";
import { Router } from "express";
import protect from "../../helpers/authentication";

const router = Router();

// router.post("/", createChemist);
router.route("/").post(createChemist);
router.route("/login").post(loginUser);
router.get("/", getAllChemist);
router.patch("/:id");
router.delete("/:id");

export default router;
