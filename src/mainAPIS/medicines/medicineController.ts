import { RequestHandler } from "express";
import { response } from "../../helpers/responseHandler";
import medicineModel from "./medicineModel";
import redis from "redis";
import { createClient } from "redis";

const client = createClient();

export const createMedicine: RequestHandler = async (req, res, next) => {
    try {
        const medicine = new medicineModel(req.body);
        return await medicine
            .save()
            .then((medicine) => {
                response(201, 1, medicine, "Medicine created", res);
            })
            .catch((err: any) => {
                response(400, 0, err.message, "error occured", res);
            });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllMedicines: RequestHandler = async (req, res, next) => {
    try {
        const medicine = await medicineModel.find();

        if (medicine) {
            client.set("getData", JSON.stringify(medicine));
            response(200, 1, medicine, "Medicine fetched", res);
        }
    } catch (error: any) {
        response(400, 0, error.message, "Medicine not fetched", res);
    }
};

// export const redis_data : RequestHandler = async(req,res,next)=>{
//     client.get('getData',(err:any,redisData:any)=>{
//         if(err){
//             response(400,0,err.message,"Redis Medicine not fetched",res)
//         } else if(redisData){
//               response(200,1,JSON.parse(redisData),"Redis Medicine fetched",res)
//         } else{
//             next()
//         }
//     })
// }
