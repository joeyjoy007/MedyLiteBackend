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
exports.getParticularState = exports.getState = exports.createState = void 0;
const responseHandler_1 = require("./../../../helpers/responseHandler");
const stateModel_1 = __importDefault(require("./stateModel"));
const createState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield new stateModel_1.default(req.body);
        return address.save().then((address) => {
            (0, responseHandler_1.response)(201, 1, address, "Address created", res);
        });
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Address not created", res);
    }
});
exports.createState = createState;
const getState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield stateModel_1.default.find();
        if (address) {
            (0, responseHandler_1.response)(201, 1, address, "State fetched", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Address not getched", res);
    }
});
exports.getState = getState;
const getParticularState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield stateModel_1.default.findById({ _id: req.body.stateId }).populate('stateChild');
        if (address) {
            (0, responseHandler_1.response)(201, 1, address, "State fetched", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Address not getched", res);
    }
});
exports.getParticularState = getParticularState;
module.exports = { createState: exports.createState, getState: exports.getState, getParticularState: exports.getParticularState };
