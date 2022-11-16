import mongoose, { Schema, Document } from "mongoose";

export interface IReview {
    shopId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    reviewStar: Number;
    review: String;
}

const reviewSchema: Schema = new mongoose.Schema({
    shopId: { type: mongoose.Types.ObjectId, ref: "Shop" },
    userId: { type: mongoose.Types.ObjectId, ref: "Chemist" },
    reviewStar: { type: Number },
    review: { type: String },
});

export interface IReviewModel extends IReview, Document {}
export default mongoose.model<IReviewModel>("Review", reviewSchema);
