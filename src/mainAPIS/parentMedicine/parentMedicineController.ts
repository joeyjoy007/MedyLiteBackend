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
        const medicineCategory = await parentMedicine.find().select('name image')
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

export const updateImage:RequestHandler = async(req,res,next)=>{
    try {
        const medicineCategory = await parentMedicine.updateMany({image:'kk'})

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

export const parentCategoryById :RequestHandler = async(req,res,next)=>{
    try {
        const _id = req.body.id
        console.log('ddd',_id);
        const medicineCategory = await parentMedicine.findById(_id).populate({
            path:'child',
            populate:[{
                path:'parent'
            }]
        })

        if(medicineCategory){
            response(201,1,medicineCategory,"MedicineCategory fetched",res)
        }
        else{
            response(400,0,"Category not found","error occured",res)
        }
      
    } catch (error:any) {
         res.status(400).json({message:error.message})
    }
}
