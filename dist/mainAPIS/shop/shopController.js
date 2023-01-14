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
exports.getAllShops = exports.showShopItem = exports.insertShopItem = void 0;
const responseHandler_1 = require("../../helpers/responseHandler");
const shopModal_1 = __importDefault(require("./shopModal"));
const insertShopItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("body", req.body);
        const _id = req.params.id;
        const shopItem = yield shopModal_1.default.findByIdAndUpdate(_id, {
            shopItems: req.body,
        }, { new: true });
        if (shopItem) {
            (0, responseHandler_1.response)(200, 1, shopItem, "Shop Items Added", res);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.insertShopItem = insertShopItem;
const showShopItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const shopItem = yield shopModal_1.default
            .findById(_id)
            .select("shopItems")
            .populate({
            path: "shopItems",
            populate: [
                {
                    path: "parent",
                },
            ],
        });
        if (shopItem) {
            (0, responseHandler_1.response)(200, 1, shopItem, "Shop Items Added", res);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.showShopItem = showShopItem;
const getAllShops = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shops = yield shopModal_1.default.find().populate({
            // path:'shopOwner shopItems reviews',
            path: 'shopOwner',
            populate: [
                {
                    path: 'shopId',
                    populate: [
                        { path: 'reviews',
                            populate: [{
                                    path: 'userId'
                                }]
                        },
                        { path: 'shopItems',
                            populate: [{
                                    path: 'parent'
                                }]
                        }
                    ]
                }
            ]
        }).select('shopOwner');
        if (shops) {
            (0, responseHandler_1.response)(200, 1, shops, "Shop fetched", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error, "Shop not fetched", res);
    }
});
exports.getAllShops = getAllShops;
