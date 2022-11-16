import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { response } from "../../helpers/responseHandler";

export interface IShop {
    shopOwner: Types.ObjectId;
    reviews: any;
}

export interface IShopModel extends IShop, Document {}

const shopSchema: Schema = new Schema(
    {
        shopName: {
            type: String,
        },
        shopOwner: {
            type: mongoose.Types.ObjectId,
            ref: "Chemist",
        },

        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            },
        ],
        shopItems: [
            {
                type: mongoose.Types.ObjectId,
                ref: "MedicineList",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IShopModel>("Shop", shopSchema);
