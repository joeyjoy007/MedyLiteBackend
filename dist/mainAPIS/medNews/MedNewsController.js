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
exports.getNews = exports.createNews = void 0;
const MedNewsSchema_1 = __importDefault(require("./MedNewsSchema"));
const responseHandler_1 = require("../../helpers/responseHandler");
const createNews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield new MedNewsSchema_1.default(req.body).save();
        if (news) {
            (0, responseHandler_1.response)(201, 1, news, "News created", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error, "News not created", res);
    }
});
exports.createNews = createNews;
const getNews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield MedNewsSchema_1.default.find();
        if (news) {
            (0, responseHandler_1.response)(201, 1, news, "News fetched", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error, "News not fetched", res);
    }
});
exports.getNews = getNews;
