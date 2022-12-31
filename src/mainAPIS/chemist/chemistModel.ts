import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { response } from "../../helpers/responseHandler";

export interface IChemist {
        name:  string ,
        experience:  string ,
        phoneNumber:  string ,
        password:  string ,
        role: string,
        shopName:  string ,
        shopId: Types.ObjectId,
        streetAddress: Types.ObjectId,
}

export interface IChemistModel extends IChemist, Document {
    comparePassword(p: string, r: any);
}

const chemistSchema: Schema = new Schema(
    {
        name: { type: String },
        experience: { type: String },
        phoneNumber: { type: String },
        password: { type: String },
        role: { type: String, default: "user" },
        shopName: { type: String },
        shopId: { type: mongoose.Types.ObjectId, ref: "Shop" },
        streetAddress: { type: mongoose.Types.ObjectId ,ref:"StreetAddress"},
    },
    {
        timestamps: true,
    }
);

chemistSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(null);
    } else {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

chemistSchema.methods.comparePassword = async function (
    password: string,
    res: Response
) {
    const matchPassword = await bcrypt.compare(password, this.password);
    if (!matchPassword) {
        response(400, 0, "Invalid credentials", "Invalid Credentials", res);
    }
    return matchPassword;
};

export default mongoose.model<IChemistModel>("Chemist", chemistSchema);
