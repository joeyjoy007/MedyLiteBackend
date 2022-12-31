import { response } from './../../../helpers/responseHandler';

import { RequestHandler } from "express";
import stateModel from './stateModel';

export const createState: RequestHandler = async (req, res, next) => {
    try {
        const address = await new stateModel(req.body);
        return address.save().then((address) => {
            response(201, 1, address, "Address created", res);
        });
    } catch (error: any) {
        response(400, 0, error.message, "Address not created", res);
    }
};

export const getState: RequestHandler = async (req, res, next) => {
    try {
        const address = await  stateModel.find();
        if(address){
            response(201, 1, address, "State fetched", res);
        }
    } catch (error: any) {
        response(400, 0, error.message, "Address not getched", res);
    }
};
export const getParticularState: RequestHandler = async (req, res, next) => {
    try {
        console.log("daata",req.body)
        const address = await  stateModel.findById({_id:req.body.stateId}) .populate({
                path: "stateChild",
                populate: [
                    {
                        path: "chemistInArea",
                    },
                ],
            });
        if(address){
            response(201, 1, address, "State fetched", res);
        }
    } catch (error: any) {
        response(400, 0, error.message, "Address not getched", res);
    }
};


module.exports = { createState , getState ,getParticularState};
