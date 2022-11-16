import { RequestHandler } from "express";
import { response } from "../../helpers/responseHandler";
import shopModal from "./shopModal";

export const insertShopItem: RequestHandler = async (req, res, next) => {
    try {
        console.log("body", req.body);
        const _id = req.params.id;
        const shopItem = await shopModal.findByIdAndUpdate(
            _id,
            {
                shopItems: req.body,
            },
            { new: true }
        );
        if (shopItem) {
            response(200, 1, shopItem, "Shop Items Added", res);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const showShopItem: RequestHandler = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const shopItem = await shopModal
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
            response(200, 1, shopItem, "Shop Items Added", res);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
