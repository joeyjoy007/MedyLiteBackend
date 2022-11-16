"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const streetAddressController_1 = require("./streetAddressController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/create', streetAddressController_1.createStreetAddress);
router.get('/get', streetAddressController_1.getStreetAddress);
exports.default = router;
