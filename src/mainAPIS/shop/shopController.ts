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

export const getAllShops:RequestHandler = async(req,res,next)=>{
    try {
        const shops = await shopModal.find().populate({
            // path:'shopOwner shopItems reviews',
            path:'shopOwner',
            populate:[
                {
                    path:'shopId',
                    populate:[
                        {path:'reviews',
                        populate:[{
                            path:'userId'
                        }]
                    },
                    {path:'shopItems',
                    populate:[{
                        path:'parent'
                    }]
                    }
                    ]
                }
            ]
        }).select('shopOwner')
        if(shops){
            response(200, 1, shops, "Shop fetched", res);
        }

    } catch (error:any) {
        response(400, 0, error, "Shop not fetched", res);
    }
}