"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.URL || "";
const PORT = process.env.PORT || 8080;
exports.config = {
    mongo: {
        uri: MONGO_URL
    },
    port: {
        port: PORT
    }
};
