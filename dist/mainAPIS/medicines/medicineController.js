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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMedicines = exports.createMedicine = void 0;
const responseHandler_1 = require("../../helpers/responseHandler");
const medicineModel_1 = __importDefault(require("./medicineModel"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const createMedicine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicine = new medicineModel_1.default(req.body);
        return yield medicine
            .save()
            .then((medicine) => {
            (0, responseHandler_1.response)(201, 1, medicine, "Medicine created", res);
        })
            .catch((err) => {
            (0, responseHandler_1.response)(400, 0, err.message, "error occured", res);
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createMedicine = createMedicine;
const getAllMedicines = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicine = yield medicineModel_1.default.find();
        if (medicine) {
            client.set("getData", JSON.stringify(medicine));
            (0, responseHandler_1.response)(200, 1, medicine, "Medicine fetched", res);
        }
    }
    catch (error) {
        (0, responseHandler_1.response)(400, 0, error.message, "Medicine not fetched", res);
    }
});
exports.getAllMedicines = getAllMedicines;
// export const redis_data : RequestHandler = async(req,res,next)=>{
//     client.get('getData',(err:any,redisData:any)=>{
//         if(err){
//             response(400,0,err.message,"Redis Medicine not fetched",res)
//         } else if(redisData){
//               response(200,1,JSON.parse(redisData),"Redis Medicine fetched",res)
//         } else{
//             next()
//         }
//     })
// }
