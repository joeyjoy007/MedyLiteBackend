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
exports.getAllChemist = exports.loginUser = exports.createChemist = void 0;
const generateToken_1 = require("./../../helpers/generateToken");
const responseHandler_1 = require("../../helpers/responseHandler");
const chemistModel_1 = __importDefault(require("./chemistModel"));
const shopModal_1 = __importDefault(require("../shop/shopModal"));
const streetAddressModel_1 = __importDefault(require("../address/streetAddress/streetAddressModel"));
const userAddressModel_1 = __importDefault(require("../address/userAddress/userAddressModel"));
const createChemist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Chemist Data...", req.body);
        const chemist = yield new chemistModel_1.default(req.body).save()
            .then((chemist) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(66);
            (0, responseHandler_1.response)(201, 1, chemist, "Chemist created", res);
            if (chemist.role === "Chemist") {
                const shop = yield new shopModal_1.default({
                    shopName: chemist.shopName,
                    shopOwner: chemist._id,
                }).save();
                console.log(2);
                const updateChemist = yield chemistModel_1.default.findByIdAndUpdate({
                    _id: chemist._id,
                }, { shopId: shop._id });
                const createUserAddress = yield new userAddressModel_1.default(Object.assign(Object.assign({}, req.body), { shopNearBy: shop._id })).save();
                const updateAddress = yield streetAddressModel_1.default.findByIdAndUpdate({ _id: req.body.streetAddress }, {
                    $push: { chemistInArea: chemist._id }
                });
            }
        }))
            .catch((err) => {
            (0, responseHandler_1.response)(400, 0, err.message, "Chemist not fethced", res);
        });
        // return await chemist
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Chemist not fethced", res);
    }
});
exports.createChemist = createChemist;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = req.body;
    let token;
    console.log(phoneNumber, password);
    try {
        if (!phoneNumber || !password) {
            console.log(1);
            (0, responseHandler_1.response)(400, 0, "Complete details", "Details not found", res);
        }
        else {
            console.log(2);
            const user = yield chemistModel_1.default.findOne({ phoneNumber });
            console.log("USER", user);
            if (!user) {
                console.log(3);
                (0, responseHandler_1.response)(400, 0, "User not found", "User not found", res);
            }
            else {
                console.log(4);
                const matchPassword = yield user.comparePassword(password, res);
                console.log(matchPassword);
                if (!matchPassword) {
                    console.log(6);
                    (0, responseHandler_1.response)(400, 0, "Credentials are not valid", "Credentials are not valid", res);
                }
                else {
                    token = yield (0, generateToken_1.generateToken)(user._id);
                    (0, responseHandler_1.response)(200, 1, { user, token }, "Login Successfull", res);
                }
            }
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "User not found", res);
    }
});
exports.loginUser = loginUser;
const getAllChemist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chemist = yield chemistModel_1.default.find({ role: 'Chemist' }).populate({
            path: 'shopId',
            populate: [{
                    path: 'reviews'
                }]
        });
        if (chemist) {
            (0, responseHandler_1.response)(200, 1, chemist, "Chemist fethced", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Chemist not fethced", res);
    }
});
exports.getAllChemist = getAllChemist;
