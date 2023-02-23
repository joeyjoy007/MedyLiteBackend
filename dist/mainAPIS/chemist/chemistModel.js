"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const responseHandler_1 = require("../../helpers/responseHandler");
const chemistSchema = new mongoose_1.Schema({
    name: { type: String },
    experience: { type: String },
    phoneNumber: { type: String },
    password: { type: String },
    role: { type: String, default: "User" },
    shopName: { type: String },
    shopId: { type: mongoose_1.default.Types.ObjectId, ref: "Shop" },
    localAddress: { type: String },
    // streetAddress: { type: mongoose.Types.ObjectId ,ref:"StreetAddress"}, //common
}, {
    timestamps: true,
});
chemistSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next(null);
        }
        else {
            this.password = yield bcrypt_1.default.hash(this.password, 10);
        }
    });
});
chemistSchema.methods.comparePassword = function (password, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const matchPassword = yield bcrypt_1.default.compare(password, this.password);
        if (!matchPassword) {
            (0, responseHandler_1.response)(400, 0, "Invalid credentials", "Invalid Credentials", res);
        }
        return matchPassword;
    });
};
exports.default = mongoose_1.default.model("Chemist", chemistSchema);
