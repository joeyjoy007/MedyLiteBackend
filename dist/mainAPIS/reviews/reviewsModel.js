"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    shopId: { type: mongoose_1.default.Types.ObjectId, ref: "Shop" },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "Chemist" },
    reviewStar: { type: Number },
    review: { type: String },
});
exports.default = mongoose_1.default.model("Review", reviewSchema);
