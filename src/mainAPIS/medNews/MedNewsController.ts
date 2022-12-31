import { RequestHandler } from "express";
import MedNewsSchema from "./MedNewsSchema";
import { response } from "../../helpers/responseHandler";

export const createNews :RequestHandler = async(req,res,next)=>{
    try {
        const news = await new MedNewsSchema(req.body).save();
        if(news){
            response(201, 1, news, "News created", res);
        }
    } catch (error:any) {
        response(400, 0, error, "News not created", res);
    }
    
}