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
exports.parentCategoryById = exports.updateImage = exports.getParentCategoryName = exports.createParentCategory = void 0;
const responseHandler_1 = require("../../helpers/responseHandler");
const parentMedicine_1 = __importDefault(require("./parentMedicine"));
const createParentCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicineCategory = new parentMedicine_1.default(req.body);
        return yield medicineCategory.save().then((medicine) => {
            (0, responseHandler_1.response)(201, 1, medicineCategory, "MedicineCategory created", res);
        }).catch((err) => {
            (0, responseHandler_1.response)(400, 0, err.message, "error occured", res);
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createParentCategory = createParentCategory;
const getParentCategoryName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicineCategory = yield parentMedicine_1.default.find().select('name image');
        if (medicineCategory) {
            (0, responseHandler_1.response)(201, 1, medicineCategory, "MedicineCategory created", res);
        }
        else {
            (0, responseHandler_1.response)(400, 0, "Category not found", "error occured", res);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getParentCategoryName = getParentCategoryName;
const updateImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicineCategory = yield parentMedicine_1.default.updateMany({ image: 'kk' });
        if (medicineCategory) {
            (0, responseHandler_1.response)(201, 1, medicineCategory, "MedicineCategory created", res);
        }
        else {
            (0, responseHandler_1.response)(400, 0, "Category not found", "error occured", res);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateImage = updateImage;
const parentCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.body.id;
        console.log('ddd', _id);
        const medicineCategory = yield parentMedicine_1.default.findById(_id).populate({
            path: 'child',
            populate: [{
                    path: 'parent'
                }]
        });
        if (medicineCategory) {
            (0, responseHandler_1.response)(201, 1, medicineCategory, "MedicineCategory fetched", res);
        }
        else {
            (0, responseHandler_1.response)(400, 0, "Category not found", "error occured", res);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.parentCategoryById = parentCategoryById;
