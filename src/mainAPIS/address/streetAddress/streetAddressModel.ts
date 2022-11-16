import mongoose, { Schema, Types } from "mongoose";

export interface IState{
    city:string ,
    localAddress:string,
    pinCode:string,
    parentAddress:Types.ObjectId
    chemistInArea:string[]

}

const streetAddressSchema:Schema = new Schema({
    city:{type:String },
    localAddress:{type:String},
    pinCode:{type:String},
    parentAddress:{type:mongoose.Types.ObjectId,ref:"State"},
    chemistInArea:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Chemist"
        }
    ]


})

export interface IStateModel  extends IState, Document{}

export default mongoose.model<IStateModel>('StreetAddress',streetAddressSchema)