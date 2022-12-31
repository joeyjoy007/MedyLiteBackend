import { response } from './../../../helpers/responseHandler';
import { RequestHandler } from "express";
import streetAddressModel from './streetAddressModel';
import stateModel from '../state/stateModel';


export const createStreetAddress: RequestHandler = async (req, res, next) => {
    try {
        const address = await new streetAddressModel(req.body);
        return address.save().then(async(address) => {
            const updateState = await stateModel.findByIdAndUpdate({_id:req.body.parentAddress},{
                $push:{stateChild:address._id}
            })
            response(201, 1, address, "Streetaddress created", res);
        });
    } catch (error: any) {
        response(400, 0, error.message, "Streetaddress not created", res);
    }
};

export const getStreetAddress: RequestHandler = async (req, res, next) => {
    try {
        const address = await  streetAddressModel.find(req.body).populate('parentAddress','state')
        if(address){
            response(201, 1, address, "Streetaddress fetched ", res);
        }
    } catch (error: any) {
        response(400, 0, error.message, "Streetaddress not fetched", res);
    }
};

export const getLocalAddress: RequestHandler = async (req, res, next) => {
    try {
        console.log("VAl",req.body);
        const address = await  streetAddressModel.findById({_id:req.body.id}).populate('chemistInArea')
        if(address){
            response(201, 1, address, "Street localAddress fetched ", res);
        }
    } catch (error: any) {
        response(400, 0, error.message, "Street localAddress not fetched", res);
    }
};


module.exports = { createStreetAddress ,getStreetAddress ,getLocalAddress};
