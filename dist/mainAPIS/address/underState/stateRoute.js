"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/create', createAddress);
router.patch('/update', updateAddress);
exports.default = router;
