"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MedNewsController_1 = require("./MedNewsController");
const router = (0, express_1.Router)();
router.post('/', MedNewsController_1.createNews);
exports.default = router;
