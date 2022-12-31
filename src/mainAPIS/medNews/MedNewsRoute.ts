import { Router } from "express";
import { createNews } from "./MedNewsController";

const router = Router()

router.post('/',createNews)

export default router;