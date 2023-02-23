"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserStreetAddress = void 0;
const responseHandler_1 = require("./../../../helpers/responseHandler");
const createUserStreetAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const address = await new streetAddressModel(req.body);
        // return address.save().then(async(address) => {
        //     const updateState = await stateModel.findByIdAndUpdate({_id:req.body.parentAddress},{
        //         $push:{stateChild:address._id}
        //     })
        //     response(201, 1, address, "Streetaddress created", res);
        // });
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Streetaddress not created", res);
    }
});
exports.createUserStreetAddress = createUserStreetAddress;
