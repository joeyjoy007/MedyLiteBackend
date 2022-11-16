import mongoose, { Document, Schema } from "mongoose";

export interface IMedicine {
    name: string;
    formula: string | number;
}

export interface IMedicineModel extends IMedicine, Document {}

const medicineSchema: Schema = new Schema({
    name: { type: String },
    formula: { type: String },
});

export default mongoose.model<IMedicineModel>("Medicine", medicineSchema);
