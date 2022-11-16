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
exports.updateAddress = exports.createAddress = void 0;
const responseHandler_1 = require("./../../helpers/responseHandler");
const addressModel_1 = __importDefault(require("./addressModel"));
const createAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield new addressModel_1.default(req.body);
        return address.save().then((address) => {
            (0, responseHandler_1.response)(201, 1, address, "Address created", res);
        });
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Address not created", res);
    }
});
exports.createAddress = createAddress;
const updateAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.body.stateId;
        const address = yield addressModel_1.default.findByIdAndUpdate({ _id: _id }, {
            city: req.body.city,
            localAddress: req.body.localAddress,
        }, { new: true });
        if (address) {
            (0, responseHandler_1.response)(201, 1, address, "Address created", res);
        }
        else {
            (0, responseHandler_1.response)(400, 0, "not Updated", "Address not updated", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Address not updated", res);
    }
});
exports.updateAddress = updateAddress;
module.exports = { createAddress: exports.createAddress, updateAddress: exports.updateAddress };
