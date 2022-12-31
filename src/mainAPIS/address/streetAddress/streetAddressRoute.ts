import { createStreetAddress, getLocalAddress, getStreetAddress } from './streetAddressController';
import { Router } from "express";


const router = Router()

router.post('/create',createStreetAddress)
router.get('/get',getStreetAddress)
router.post('/getLocal',getLocalAddress)


export default router;