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
exports.getCityPincode = exports.getCityAddress = exports.getLocalAddress = exports.getStreetAddress = exports.createStreetAddress = void 0;
const responseHandler_1 = require("./../../../helpers/responseHandler");
const streetAddressModel_1 = __importDefault(require("./streetAddressModel"));
const stateModel_1 = __importDefault(require("../state/stateModel"));
const createStreetAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield new streetAddressModel_1.default(req.body);
        return address.save().then((address) => __awaiter(void 0, void 0, void 0, function* () {
            const updateState = yield stateModel_1.default.findByIdAndUpdate({ _id: req.body.parentAddress }, {
                $push: { stateChild: address._id }
            });
            (0, responseHandler_1.response)(201, 1, address, "Streetaddress created", res);
        }));
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Streetaddress not created", res);
    }
});
exports.createStreetAddress = createStreetAddress;
const getStreetAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield streetAddressModel_1.default.find(req.body).populate('parentAddress', 'state');
        if (address) {
            (0, responseHandler_1.response)(201, 1, address, "Streetaddress fetched ", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Streetaddress not fetched", res);
    }
});
exports.getStreetAddress = getStreetAddress;
const getLocalAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("VAl", req.body);
        const address = yield streetAddressModel_1.default.findById({ _id: req.body.id }).populate('chemistInArea');
        if (address) {
            (0, responseHandler_1.response)(201, 1, address, "Street localAddress fetched ", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Street localAddress not fetched", res);
    }
});
exports.getLocalAddress = getLocalAddress;
const getCityAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("VAl", req.body);
        const address = yield streetAddressModel_1.default.find({ parentAddress: req.body.id });
        console.log("Address", address);
        if (address) {
            (0, responseHandler_1.response)(201, 1, address, "state city address fetched ", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "state city address not fetched", res);
    }
});
exports.getCityAddress = getCityAddress;
const getCityPincode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("VAl", req.body);
        const address = yield streetAddressModel_1.default.find({ _id: req.body._id }).select('pinCode');
        console.log("Pincode", address);
        if (address) {
            (0, responseHandler_1.response)(201, 1, address, "pincode fetched ", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "pincode not fetched", res);
    }
});
exports.getCityPincode = getCityPincode;
module.exports = { createStreetAddress: exports.createStreetAddress, getStreetAddress: exports.getStreetAddress, getLocalAddress: exports.getLocalAddress, getCityAddress: exports.getCityAddress, getCityPincode: exports.getCityPincode };
