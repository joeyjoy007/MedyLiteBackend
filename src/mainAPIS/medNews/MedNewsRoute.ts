import { Router } from "express";
import { createNews, getNews } from "./MedNewsController";

const router = Router()

router.post('/',createNews)
router.get('/',getNews)


export default router;