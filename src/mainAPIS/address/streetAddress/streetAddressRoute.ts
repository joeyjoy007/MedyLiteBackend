import { createStreetAddress, getStreetAddress } from './streetAddressController';
import { Router } from "express";


const router = Router()

router.post('/create',createStreetAddress)
router.get('/get',getStreetAddress)


export default router;