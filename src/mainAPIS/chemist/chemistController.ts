import { generateToken } from "./../../helpers/generateToken";
import { RequestHandler } from "express";
import { response } from "../../helpers/responseHandler";
import chemistModel from "./chemistModel";
import shopModal from "../shop/shopModal";
import streetAddressModel from "../address/streetAddress/streetAddressModel";
import userAddressModel from "../address/userAddress/userAddressModel";
import { stringify } from "querystring";

export const createChemist: RequestHandler = async (req, res, next) => {
    try {
        console.log("Chemist Data...",req.body)
        const chemist = await new chemistModel(req.body).save()
            .then(async (chemist) => {
                console.log(66)
                response(201, 1, chemist, "Chemist created", res);
                if (chemist.role === "Chemist") {
                    const shop = await new shopModal({
                        shopName: chemist.shopName,
                        shopOwner: chemist._id,
                    }).save();
console.log(2)
                    const updateChemist = await chemistModel.findByIdAndUpdate(
                        {
                            _id: chemist._id,
                        },
                        { shopId: shop._id }
                    );
           

                    const createUserAddress =await new userAddressModel({...req.body,shopNearBy:shop._id}).save()
                    const updateAddress = await streetAddressModel.findByIdAndUpdate({_id:req.body.streetAddress},{
                        $push:{chemistInArea:chemist._id}
                    })
                }
            })
            .catch((err: any) => {
                response(400, 0, err.message, "Chemist not fethced", res);
            });

        // return await chemist
    } catch (error: any) {
        response(400, 0, error.message, "Chemist not fethced", res);
    }
};

export const loginUser: RequestHandler = async (req, res, next) => {
    const { phoneNumber, password } = req.body;
    let token;
    console.log(phoneNumber, password);
    try {
        if (!phoneNumber || !password) {
            console.log(1);
            response(400, 0, "Complete details", "Details not found", res);
        } else {
            console.log(2);
            const user = await chemistModel.findOne({ phoneNumber });
            console.log("USER", user);
            if (!user) {
                console.log(3);
                response(400, 0, "User not found", "User not found", res);
            } else {
                console.log(4);
                const matchPassword = await user.comparePassword(password, res);
                console.log(matchPassword);
                if (!matchPassword) {
                    console.log(6);
                    response(
                        400,
                        0,
                        "Credentials are not valid",
                        "Credentials are not valid",
                        res
                    );
                } else {
                    token = await generateToken(user._id);
                    response(200, 1, { user, token }, "Login Successfull", res);
                }
            }
        }
    } catch (error) {
        response(400, 0, error.message, "User not found", res);
    }
};

export const getAllChemist: RequestHandler = async (req, res, next) => {
    try {
        const chemist = await chemistModel.find({role:'Chemist'}).populate({
            path:'shopId',
            populate:[{
                path:'reviews'
            }]
        });
        if (chemist) {
            response(200, 1, chemist, "Chemist fethced", res);
        }
    } catch (error: any) {
        response(400, 0, error.message, "Chemist not fethced", res);
    }
};
