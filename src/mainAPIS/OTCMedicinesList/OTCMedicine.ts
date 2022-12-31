import { IMedicineModel } from './../medicines/medicineModel';
import mongoose,{ Types ,Document, Schema} from "mongoose";

export interface IMedicineList{
    name:string,
    parent:Types.ObjectId,
    effective:string
}

export interface IMedicineListModel extends IMedicineList,Document{}

const medicineListSchema:Schema = new Schema({
    name:{type:String},
    parent:[{type:mongoose.Types.ObjectId,ref:"ParentCategory"}],
    effective:{type:String}
})

export default mongoose.model<IMedicineModel>('MedicineList',medicineListSchema)