import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import chemistModel from "../mainAPIS/chemist/chemistModel";
import { response } from "./responseHandler";

const protect: RequestHandler = async (req, res, next) => {
    let token: any;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            console.log("RTO", req.headers.authorization);
            token = await req.headers.authorization.split(" ")[1];
            console.log("TOM", token);
            const decode: any = await jwt.verify(token, "GARVIT");
            console.log("DECODE", decode);
            console.log("REQU", req.user);

            req.user = await chemistModel
                .findById(decode._id)
                .select("-password");
            next();
        } catch (error) {
            response(400, 0, error.message, "Token not defined", res);
        }
    }

    if (!token) {
        response(400, 0, "Token not found", "Token not found", res);
    }
};

export default protect;
