"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const statusCodes_1 = require("./statusCodes");
const loggers_1 = require("./loggers");
const env_1 = __importDefault(require("./env"));
const errorHandler = (err, req, res, _next) => {
    if (err instanceof zod_1.ZodError) {
        const response = new statusCodes_1.ApiError({
            statusCode: 400,
            message: 'Body invalido',
            title: "Bad Request",
            success: false,
            data: err.format(),
        });
        return res.status(response.statusCode).json(response.getResponse());
    }
    if (err instanceof statusCodes_1.ApiError) {
        return res.status(err.statusCode).json(err.getResponse());
    }
    // manage 500 errors
    loggers_1.errorLog.error(err);
    if (env_1.default.NODE_ENV === 'production') {
        const response = new statusCodes_1.ApiError({
            statusCode: 500,
            title: "Error de Servidor",
            message: `Ha ocurrido un error en el endpoint ${req.method} ${req.url}`,
        });
        return res.status(response.statusCode).json(response.getResponse());
    }
    console.log(err);
    const response = new statusCodes_1.ApiError({
        statusCode: 500,
        title: "Error de Servidor",
        message: err.message,
    });
    res.status(response.statusCode).json(response.getResponse());
};
exports.errorHandler = errorHandler;
