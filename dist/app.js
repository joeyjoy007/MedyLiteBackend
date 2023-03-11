"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
// import todoRoutes from './routes/medicineRoute'
const mongoose_1 = __importDefault(require("mongoose"));
const Logging_1 = __importDefault(require("./log/Logging"));
const medicineRoutes_1 = __importDefault(require("./mainAPIS/medicines/medicineRoutes"));
const chemistRoutes_1 = __importDefault(require("./mainAPIS/chemist/chemistRoutes"));
const parentMedicineRoute_1 = __importDefault(require("./mainAPIS/parentMedicine/parentMedicineRoute"));
const OTCMedicineRoutes_1 = __importDefault(require("./mainAPIS/OTCMedicinesList/OTCMedicineRoutes"));
const shopRoute_1 = __importDefault(require("./mainAPIS/shop/shopRoute"));
const reviewRoute_1 = __importDefault(require("./mainAPIS/reviews/reviewRoute"));
const stateRoute_1 = __importDefault(require("./mainAPIS/address/state/stateRoute"));
const streetAddressRoute_1 = __importDefault(require("./mainAPIS/address/streetAddress/streetAddressRoute"));
const MedNewsRoute_1 = __importDefault(require("./mainAPIS/medNews/MedNewsRoute"));
const y = require("./redis");
const app = (0, express_1.default)();
/** Connect to mongoDB */
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(config_1.config.mongo.uri)
    .then(() => {
    Logging_1.default.info("Database connected");
    startServer();
})
    .catch((err) => {
    console.log("Error==>", err.message);
});
// app.use('/todos',todoRoutes)
// app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
// res.status(500).json({message:err.message})
// })
const startServer = () => {
    app.use((req, res, next) => {
        Logging_1.default.info(`Incoming => Method :[${req.method}] - Url :[${req.url}] = IP [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            Logging_1.default.info(`Incoming => Method :[${req.method}] - Url :[${req.url}] = IP [${req.socket.remoteAddress}] -Status :[${req.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    /**routes */
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin,Content-Type,X-Requested-With,Accept,Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT,PATCH,GET,POST,DELETE");
            return res.status(200).json({});
        }
        next();
    });
    /**Routes */
    app.use("/api/medicine", medicineRoutes_1.default);
    app.use("/api/chemist", chemistRoutes_1.default);
    app.use("/api/parentCategory", parentMedicineRoute_1.default);
    app.use("/api/medicineList", OTCMedicineRoutes_1.default);
    app.use("/api/shop", shopRoute_1.default);
    app.use("/api/review", reviewRoute_1.default);
    app.use("/api/state", stateRoute_1.default);
    app.use("/api/street", streetAddressRoute_1.default);
    app.use("/api/medNews", MedNewsRoute_1.default);
    /**Healthcheck */
    /**Error handeling */
    app.use((req, res, next) => {
        const error = new Error("not found");
        Logging_1.default.error(error);
        return res.status(404).json({ error: error.message });
    });
    app.get('/api/start', (req, res) => {
        res.send("App started");
    });
    app.listen(config_1.config.port.port, () => {
        Logging_1.default.info(`Port is running on ${config_1.config.port.port}`);
    });
};
