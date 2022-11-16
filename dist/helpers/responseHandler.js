"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (status, resStatus, payload, message, res) => {
    return res.status(status).json({
        status: resStatus,
        message: message,
        payload: payload,
    });
};
exports.response = response;
