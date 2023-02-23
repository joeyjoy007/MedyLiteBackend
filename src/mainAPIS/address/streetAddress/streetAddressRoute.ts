import { createStreetAddress, getLocalAddress, getStreetAddress, getCityAddress, getCityPincode } from './streetAddressController';
import { Router } from "express";


const router = Router()

router.post('/create',createStreetAddress)
router.get('/get',getStreetAddress)
router.post('/getCity',getCityAddress)
router.post('/getPincode',getCityPincode)
router.post('/getLocal',getLocalAddress)


export default router;