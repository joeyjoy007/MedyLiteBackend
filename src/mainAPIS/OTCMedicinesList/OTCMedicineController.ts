import { RequestHandler } from "express";
import { response } from "../../helpers/responseHandler";
import parentMedicine from "../parentMedicine/parentMedicine";
import OTCMedicine from "./OTCMedicine";

// const allergiesMedicine:string[] = [
//    " Benadryl (25mg)",
// "Benadryl Liquid",
// "Cetirizine (10mg)",
// "Chlorpheniramine (4mg)",
// "Fexofenadine (60mg)",
// "Fexofenadine (180mg)",
// "Fluticasone Nasal Spray (60 &120 sprays)",
// "Ketotifen Eye Drops (Zaditor)",
// "Loratadine (10mg)",
// "Pataday Eye Drops (2.5ml, 5ml)",
// "Triamcinolone Nasal Spray",
// ]

// const allergiesMedicine:string[] = [

// "Afrin Nasal Spray",
// "Ayr Saline Nasal Gel",

// "Cepacol Sore Throat",
// "Cepacol Sore throat & Cough",
// "Chloraseptic Spray",
// "Cold-Eeze Zinc Lozenges",
// "Dayquil Caps",
// "Daytime Cold & Flu Syrup",
// "DeepSea Saline DropsNeti Pot",
// "Delsym",
// "Guaifenesin Syrup",
// "Mucinex",
// "Mucinex DM",
// "Mucinex DM Maximum Strength",
// "NeilMed Sinus Rinse Kit",
// "Nighttime Cough Syrup",
// "Nyquil Caps",
// "Q-Tussin DM Syrup",
// "SinuCleanse (Neti Pot Refill Pkts)",
// "Sucrets",
// "Sudogest PE",
// ]

// const EYE_care:string[]=[
//   "  Blink Contacts Eye Drops",
// "Boston Conditioning Solution",
// "Eye Wash",
// "Genteal Tears Gel",
// "Genteal Tears Drops",
// "Lubricating Plus Eye Drops",
// "Lumify Drops",
// "OCcusoft Eye Scrub",
// "Refresh Celluvisc Gel",
// "Refresh Liquigel Drops",
// "Refresh Optive Drops",
// "Refresh PM Oint.",
// "ReNu Multi-Purpose Sol.",
// "Systane Balance Drops",
// "Systane Nighttime Ointment",
// "Systane Ultra Drops",
// "Theratears Drops",
// ]

// const firstAdd:string[]=[

// "Abreva",
// "Aloe Vera Gel",
// "Bacitracin Ointment",
// "BandAids",
// "Carmex",
// "Chapstick",
// "Corti-balm",
// "Domeboro",
// "Epsom Salt",
// "Hand Sanitizer",
// "Hibiclens Cleanser",
// "Hot/cold pack",
// "Mediplast",
// "Murine Ear Wax Removal Kit",
// "Petroleum Jelly",
// "Solarcaine Gel & Spray",
// "Tablet Cutter",
// "Triple Antibiotic Ointment",
// "Tucks Witchazel Pads",
// "Vick’s VapoRub",
// "Wart remover Liquid",
// "Wound Wash",
// ]

// const gas:string[]=[
//     "Acid Gone Tabs",
// "Almacone Liquid",
// "Famotidine (10mg)",
// "Gaviscon Tablets",
// "Lactaid Tablets",
// "Meclizine Tablets (25mg)",
// "Nexium OTC (14 count)",
// "Pepcid Complete",
// "Pepto Bismol - Chewable and Liquid",
// "Prilosec OTC (42 count)",
// "Simethicone Tablets (80mg, 125mg)",
// "Tums Chews",
// "Zegerid OTC (42 count)",
// ]

// const g:string[]=[
//    'Astroglide Gel',
// 'Clotrimazole (7 day cream)',
// 'Clotrimazole (3 day cream)',
// 'E-Contra One Step',
// 'Monistat (3 day cream)',
// 'Rephresh',
// 'Vagisil Wash',
// ]

// const diaherio:string[]=[
//     'Benefiber Powder',
// 'Bisacodyl Tablets (5mg)',
// 'Docusate Sodium (100mg capsules)',
// 'Drip Drop Electrolyte powder',
// 'Dulcolax Suppositories (10mg)',
// 'Ex-Lax Tablets',
// 'Fiber Tabs',
// 'Fleet Enemas',
// 'Glycerin Suppositories',
// 'Hydralyte Electrolyte tabs',
// 'Loperamide (2mg tabs)',
// 'MetaMucil Fiber Thins',
// 'Milk of Magnesia',
// 'Mineral Oil',
// 'Miralax',
// 'Reguloid Powder',
// 'Senna Plus Tabs',
// ]

// const pr:string[]=[
//     'Acetaminophen Liquid (500mg/15ml)',
// 'Acetaminophen (Tylenol, 325mg, 500mg)',
// 'Acetaminophen PM',
// 'Acetaminophen ER (650mg)',
// 'Acetaminophen, Aspirin & Caffeine',
// 'Aspirin (81mg, 325mg)',
// 'Ibuprofen (Advil)',
// 'Ibuprofen Suspension (100mg/5ml)',
// 'Naproxen Sodium (Aleve, 220mg)',
// 'Midol Complete',
// 'Urinary Pain Relief',
// ]

// const pb:string[]=[
//     'Acidophillus Tabs',
// 'Florastor',
// 'Florajen Acidophillus',
// ]

// const skin:string[]=[
//     'Aquaphor Ointment',
// 'Benadryl Cream',
// 'Bag Balm',
// 'Calamine Lotion',
// 'Cetaphil Cream',
// 'Ceta-Klenz Cleanser',
// 'Differin 0.1% Gel',
// 'Eucerin Cream',
// 'Gold Bond Ultimate (Lotion and Cream)',
// 'Gold Bond Psoriasis Cream',
// 'Hemorrhoid Ointment',
// 'Hydrocortisone 1% Cream',
// 'Lice Killing Shampoo',
// 'Lubriderm Lotion',
// 'Permethrin 1% Lotion',
// 'Sarna Anti-Itch',
// 'Terbinafine 1% Cream',
// 'Vitamin A & D Ointment',
// 'Zinc Oxide Ointment',
// ]

// const tr:string[]=[
//  "Aspercreme",
// "Biofreeze"
// ]

const vs: string[] = [
    "Calcium Citrate + D (Citracal)",
    "Cerovite multi-vitamin/multi-mineral",
    "EmergenC (1,000mg 10pk Raspberry, Orange)",
    "EmergenC Energy+ Gummies",
    "Melatonin (3mg, 5mg, 10mg)",
    "One-a-day Women’s Vitamin",
    "Omega 3 Fish Oil (1,000mg)",
    "Vitamin A (10,000 IU)",
    "Vitamin B Complex",
    "Vitamin B-6 (25mg)",
    "Vitamin B-12 (1,000mcg)",
    "Vitamin C (500mg)",
    "Vitamin D3 (2,000 IU)",
    "Vitamin D3 (400 IU)",
    "Vitamin D3 1,000 IU",
    "Vitamin E (400 IU)",
];
export const createMedicineList: RequestHandler = async (req, res, next) => {
    try {
        // for(let i = 0;i<alleriesMedicine.length;i++){
        //  const medicineList = await  OTCMedicine.create({name:alleriesMedicine[i]})
        // return await medicineList.save().then((medicine)=>{
        //   response(201,1,medicineList,"MedicineList created",res)
        // }).catch((err:any)=>{
        // response(400,0,err.message,"error occured",res)
        // })

        // }
        // const medicineList = await OTCMedicine.find({parent:"6316f55f67fecc17c7537500"})
        //     medicineList.map(async (e)=>{
        //         const i = await OTCMedicine.findByIdAndUpdate({_id:e._id},{$push:{parent:"6316ffab2739372be942d2b6"}})
        //         const p = await parentMedicine.findByIdAndUpdate({_id:"6316ffab2739372be942d2b6"},{$push:{child:e._id}})
        //     })
        vs.forEach(async (element) => {
            //  const medicineList = new OTCMedicine({name:element,parent:"6316f55f67fecc17c7537500"})
            const medicineList = new OTCMedicine({
                name: element,
                parent: "63171014e615d349abb41d32",
            });
            if (medicineList) {
                medicineList.save();

                const updateChild = await parentMedicine.findByIdAndUpdate(
                    { _id: "63171014e615d349abb41d32" },
                    { $push: { child: medicineList._id } }
                );
            } else {
                response(
                    400,
                    0,
                    { error: "Error Occured" },
                    "Not able to create Medicines",
                    res
                );
            }
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllMedicine: RequestHandler = async (req, res, next) => {
    try {
        const medicine = await OTCMedicine.find();
        if (medicine) {
            response(200, 1, medicine, "Medicine fethced", res);
        } else {
            response(400, 0, "Not found", "Medicine not fethced", res);
        }
    } catch (error:any) {
        response(400, 0, error.message, "Error Occured", res);
    }
};

export const updateInALlMedicine: RequestHandler = async (req, res, next) => {
    try {
        const medicine = await OTCMedicine.updateMany({effective:'80'});
        if (medicine) {
            response(200, 1, medicine, "All for update Medicine fethced", res);
        } else {
            response(400, 0, "Not found", "Medicine not fethced", res);
        }
    } catch (error:any) {
        response(400, 0, error.message, "Error Occured", res);
    }
};

export const getMedInfo: RequestHandler = async (req, res, next) => {
    try {
        const _id = req.body.id

        const medicine = await OTCMedicine.findById(_id).populate('parent')


        if (medicine) {
            response(200, 1, medicine, " Medicine fethced", res);
        } else {
            response(400, 0, "Not found", "Medicine not fethced", res);
        }
    } catch (error:any) {
        response(400, 0, error.message, "Error Occured", res);
    }
};
