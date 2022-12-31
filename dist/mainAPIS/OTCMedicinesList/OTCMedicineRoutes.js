"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../helpers/authentication"));
const OTCMedicineController_1 = require("./OTCMedicineController");
const router = (0, express_1.Router)();
router.post("/", authentication_1.default, OTCMedicineController_1.createMedicineList);
router.get("/", OTCMedicineController_1.getAllMedicine);
router.patch("/:id");
router.delete("/:id");
router.put("/update", OTCMedicineController_1.updateInALlMedicine);
exports.default = router;
