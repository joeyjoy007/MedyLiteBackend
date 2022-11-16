import { Response } from "express";

export const response = (status:number, resStatus:number, payload:{}, message:string, res:Response) => {
    return res.status(status).json({
        status: resStatus,
        message: message,
        payload: payload,
    });
};

