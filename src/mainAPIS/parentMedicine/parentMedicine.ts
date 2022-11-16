import { IMedicineModel } from './../medicines/medicineModel';
import mongoose,{ Types ,Document, Schema} from "mongoose";

export interface IMedicineCategory{
    name:string,
    child:[Types.ObjectId]
}

export interface IMedicineCategoryModel extends IMedicineCategory,Document{}

const medicineCategorySchema:Schema = new Schema({
    name:{type:String},
    child:[
        {type:mongoose.Types.ObjectId,ref:"MedicineList"}
    ]
})

export default mongoose.model<IMedicineCategoryModel>('ParentCategory',medicineCategorySchema)