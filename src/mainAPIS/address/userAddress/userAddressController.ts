import { response } from './../../../helpers/responseHandler';
import { RequestHandler } from "express";
import streetAddressModel from './streetAddressModel';
import stateModel from '../state/stateModel';


export const createUserStreetAddress: RequestHandler = async (req, res, next) => {
    try {
        // const address = await new streetAddressModel(req.body);
        // return address.save().then(async(address) => {
        //     const updateState = await stateModel.findByIdAndUpdate({_id:req.body.parentAddress},{
        //         $push:{stateChild:address._id}
        //     })
        //     response(201, 1, address, "Streetaddress created", res);
        // });
    } catch (error: any) {
        response(400, 0, error.message, "Streetaddress not created", res);
    }
};




