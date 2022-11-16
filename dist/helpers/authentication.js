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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const chemistModel_1 = __importDefault(require("../mainAPIS/chemist/chemistModel"));
const responseHandler_1 = require("./responseHandler");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            console.log("RTO", req.headers.authorization);
            token = yield req.headers.authorization.split(" ")[1];
            console.log("TOM", token);
            const decode = yield jsonwebtoken_1.default.verify(token, "GARVIT");
            console.log("DECODE", decode);
            console.log("REQU", req.user);
            req.user = yield chemistModel_1.default
                .findById(decode._id)
                .select("-password");
            next();
        }
        catch (error) {
            (0, responseHandler_1.response)(400, 0, error.message, "Token not defined", res);
        }
    }
    if (!token) {
        (0, responseHandler_1.response)(400, 0, "Token not found", "Token not found", res);
    }
});
exports.default = protect;
