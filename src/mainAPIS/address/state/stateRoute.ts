import { createState, getParticularState, getState } from "./stateController";
import { Router } from "express";

const router = Router();

router.post("/create", createState);
router.get ("/get", getState);
router.post ("/getState", getParticularState);

export default router;
