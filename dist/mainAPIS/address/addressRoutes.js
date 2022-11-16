"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressController_1 = require("./addressController");
const router = (0, express_1.Router)();
router.post('/create', addressController_1.createAddress);
router.patch('/update', addressController_1.updateAddress);
exports.default = router;
