import { RequestHandler } from "express";
import medicineModel from "../mainAPIS/medicines/medicineModel";

const TODOS = []

export const createTodo:RequestHandler = async(req,res,next)=>{
    try {
        const medicine = new medicineModel(req.body)
        return await medicine.save().then((medicine)=>{
            res.status(201).json({message:medicine})
        }).catch((err:any)=>{
            res.status(400).json({message:err.message})
        })
    } catch (error:any) {
         res.status(400).json({message:error.message})
    }
}