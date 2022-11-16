"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReview = exports.createReview = void 0;
const responseHandler_1 = require("../../helpers/responseHandler");
const shopModal_1 = __importDefault(require("../shop/shopModal"));
const reviewsModel_1 = __importDefault(require("./reviewsModel"));
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield new reviewsModel_1.default(req.body).save();
        if (review) {
            console.log(review.shopId);
            const updateShop = yield shopModal_1.default.findByIdAndUpdate({ _id: review.shopId }, { $push: { reviews: review._id } });
            console.log("IP", updateShop);
        }
        (0, responseHandler_1.response)(201, 1, review, "Review  created", res);
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.medicine, "Review not created", res);
    }
});
exports.createReview = createReview;
const getReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const review = yield reviewsModel_1.default.findById(_id);
        (0, responseHandler_1.response)(201, 1, review, "Review  created", res);
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.medicine, "Review not created", res);
    }
});
exports.getReview = getReview;
