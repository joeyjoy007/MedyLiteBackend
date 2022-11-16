import mongoose, { Schema, Types } from "mongoose";

export interface IState{
    state:string ,
    stateChild:string[],
    totalChemist:string[]

}

const stateSchema:Schema = new Schema({
    state:{type:String },
    stateChild:[
        {
            type:mongoose.Types.ObjectId,
            ref:"StreetAddress"
        }
    ],
    totalChemist:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Chemist"
        }
    ]


})

export interface IStateModel  extends IState, Document{}

export default mongoose.model<IStateModel>('State',stateSchema)