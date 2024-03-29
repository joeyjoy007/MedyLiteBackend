import express, { Request, Response, NextFunction } from "express";
import { config } from "./config/config";
// import todoRoutes from './routes/medicineRoute'
import mongoose from "mongoose";
import Logging from "./log/Logging";
import medicineRoute from "./mainAPIS/medicines/medicineRoutes";
import chemistRoute from "./mainAPIS/chemist/chemistRoutes";
import parentCategoryRoute from "./mainAPIS/parentMedicine/parentMedicineRoute";
import medicineListRoute from "./mainAPIS/OTCMedicinesList/OTCMedicineRoutes";
import shopListRoute from "./mainAPIS/shop/shopRoute";
import reviewListRoute from "./mainAPIS/reviews/reviewRoute";
import stateRoute from "./mainAPIS/address/state/stateRoute";
import streetAddressRoute from "./mainAPIS/address/streetAddress/streetAddressRoute";
import medNewsRoute from "./mainAPIS/medNews/MedNewsRoute";
import { urlencoded } from "body-parser";
const y = require("./redis");
const app = express();

/** Connect to mongoDB */
mongoose.set("strictQuery", false);
mongoose
    .connect(config.mongo.uri)
    .then(() => {
        Logging.info("Database connected");
        startServer();
    })
    .catch((err) => {
        console.log("Error==>",err.message);
    });

// app.use('/todos',todoRoutes)

// app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
// res.status(500).json({message:err.message})
// })

const startServer = () => {
    app.use((req, res, next) => {
        Logging.info(
            `Incoming => Method :[${req.method}] - Url :[${req.url}] = IP [${req.socket.remoteAddress}]`
        );

        res.on("finish", () => {
            Logging.info(
                `Incoming => Method :[${req.method}] - Url :[${req.url}] = IP [${req.socket.remoteAddress}] -Status :[${req.statusCode}]`
            );
        });
        next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /**routes */
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin,Content-Type,X-Requested-With,Accept,Authorization"
        );

        if (req.method == "OPTIONS") {
            res.header(
                "Access-Control-Allow-Methods",
                "PUT,PATCH,GET,POST,DELETE"
            );
            return res.status(200).json({});
        }
        next();
    });

    /**Routes */
    app.use("/api/medicine", medicineRoute);
    app.use("/api/chemist", chemistRoute);
    app.use("/api/parentCategory", parentCategoryRoute);
    app.use("/api/medicineList", medicineListRoute);
    app.use("/api/shop", shopListRoute);
    app.use("/api/review", reviewListRoute);
    app.use("/api/state", stateRoute);
    app.use("/api/street", streetAddressRoute);
    app.use("/api/medNews", medNewsRoute);
    /**Healthcheck */

    /**Error handeling */

    app.use((req, res, next) => {
        const error = new Error("not found");
        Logging.error(error);

        return res.status(404).json({ error: error.message });
    });

    app.get('/api/start',(req,res)=>{
        res.send("App started")
    })
    app.listen(config.port.port, () => {
        Logging.info(`Port is running on ${config.port.port}`);
    });
};
