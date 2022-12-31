"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateController_1 = require("./stateController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/create", stateController_1.createState);
router.get("/get", stateController_1.getState);
router.post("/getState", stateController_1.getParticularState);
exports.default = router;
