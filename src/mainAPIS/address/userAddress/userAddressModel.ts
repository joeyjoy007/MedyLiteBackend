import mongoose, { Schema, Types } from "mongoose";

export interface IUserAddress{
    state:string ,
    city:string,
    pinCode:string,
    localAddress:string,
    shopNearBy:Types.ObjectId,

}

const userAddressSchema:Schema = new Schema({
    state:{type:String },
    city:{type:String},
    pinCode:{type:String},
    localAddress:{type:String},
    shopNearBy:
        {
            type:mongoose.Types.ObjectId,
            ref:"Shop"
        }
    


})

export interface IUserAddressModel  extends IUserAddress, Document{}

export default mongoose.model<IUserAddressModel>('UserAddress',userAddressSchema)