"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const medicineController_1 = require("./medicineController");
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../helpers/authentication"));
const router = (0, express_1.Router)();
router.post("/", authentication_1.default, medicineController_1.createMedicine);
// router.get('/',redis_data,getAllMedicines)
router.get("/", authentication_1.default, medicineController_1.getAllMedicines);
router.patch("/:id");
router.delete("/:id");
exports.default = router;
