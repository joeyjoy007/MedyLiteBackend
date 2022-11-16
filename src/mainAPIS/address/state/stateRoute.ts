import { createState, getParticularState, getState } from "./stateController";
import { Router } from "express";

const router = Router();

router.post("/create", createState);
router.get ("/get", getState);
router.get ("/getState", getParticularState);

export default router;
