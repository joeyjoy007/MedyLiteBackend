import { RequestHandler } from "express";
import { response } from "../../helpers/responseHandler";
import shopModal from "../shop/shopModal";
import reviewsModel from "./reviewsModel";

export const createReview: RequestHandler = async (req, res, next) => {
    try {
        const review = await new reviewsModel(req.body).save();
        if (review) {
            console.log(review.shopId);
            const updateShop = await shopModal.findByIdAndUpdate(
                { _id: review.shopId }
                { $push: { reviews: review._id } }
            );
            console.log("IP", updateShop);
        }
        response(201, 1, review, "Review  created", res);
    } catch (error) {
        response(400, 0, error.medicine, "Review not created", res);
    }
};

export const getReview: RequestHandler = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const review = await reviewsModel.findById(_id);
        response(201, 1, review, "Review  created", res);
    } catch (error) {
        response(400, 0, error.medicine, "Review not created", res);
    }
};
