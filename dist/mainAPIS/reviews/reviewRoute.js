"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviewController_1 = require("./reviewController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/").post(reviewController_1.createReview);
router.route("/review/:id").get(reviewController_1.getReview);
exports.default = router;
