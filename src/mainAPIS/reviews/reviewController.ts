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
                { _id: review.shopId },
                { $push: { reviews: review._id } }
            );
            console.log("IP", updateShop);
        }
        response(201, 1, review, "Review  created", res);
    } catch (error:any) {
        response(400, 0, error.medicine, "Review not created", res);
    }
};

export const getShopReview: RequestHandler = async (req, res, next) => {
    try {
        const shopId = req.params.id;

        response(201, 1, review, "Review  fetched", res);
    } catch (error:any) {
        response(400, 0, error.medicine, "Review not fetched", res);
    }
};

export const getParticularShopReview: RequestHandler = async (req, res, next) => {
    try {
        console.log('llll')
        const shopId = req.body.id;
        console.log('shhhh',shopId)
        const review = await reviewsModel.find({shopId}).populate('userId');
        console.log('Reviews',review)
        response(201, 1, review, "Review  fetched", res);
    } catch (error:any) {
        response(400, 0, error.medicine, "Review not fetched", res);
    }
};
