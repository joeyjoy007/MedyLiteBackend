"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parentMedicineController_1 = require("./parentMedicineController");
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../helpers/authentication"));
const router = (0, express_1.Router)();
router.post("/", authentication_1.default, parentMedicineController_1.createParentCategory);
router.get("/", parentMedicineController_1.getParentCategoryName);
router.post("/parent", parentMedicineController_1.parentCategoryById);
router.patch("/:id");
router.delete("/:id");
router.put("/", parentMedicineController_1.updateImage);
exports.default = router;
