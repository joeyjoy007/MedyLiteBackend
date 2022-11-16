import { RequestHandler } from "express"
import { response } from "../../helpers/responseHandler"
import parentMedicine from "./parentMedicine"


export const createParentCategory:RequestHandler = async(req,res,next)=>{
    try {
        const medicineCategory = new parentMedicine(req.body)
        return await medicineCategory.save().then((medicine)=>{
          response(201,1,medicineCategory,"MedicineCategory created",res)
        }).catch((err:any)=>{
            response(400,0,err.message,"error occured",res)
        })
    } catch (error:any) {
         res.status(400).json({message:error.message})
    }
}

export const getParentCategoryName:RequestHandler = async(req,res,next)=>{
    try {
        const medicineCategory = await parentMedicine.find().select('name')

        if(medicineCategory){
            response(201,1,medicineCategory,"MedicineCategory created",res)
        }
        else{
            response(400,0,"Category not found","error occured",res)
        }
      
    } catch (error:any) {
         res.status(400).json({message:error.message})
    }
}
