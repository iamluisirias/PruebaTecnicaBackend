"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.ApiResponse = void 0;
const env_1 = __importDefault(require("./env"));
class ApiResponse {
    constructor({ statusCode, message, data, title, success = true }) {
        this.statusCode = statusCode;
        this.title = title;
        this.message = message;
        this.success = success;
        if (typeof data === 'undefined') {
            this.data = null;
        }
        else {
            this.data = data;
        }
    }
}
exports.ApiResponse = ApiResponse;
class ApiError extends Error {
    constructor({ statusCode, message, data, title }) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.title = title;
        if (typeof data === 'undefined') {
            this.data = null;
        }
        else {
            this.data = data;
        }
    }
    getResponse() {
        return {
            message: this.message,
            data: this.data,
            title: this.title,
            success: this.success,
            statuscode: this.statusCode,
            stack: env_1.default.NODE_ENV === 'production' ? undefined : this.stack,
        };
    }
}
exports.ApiError = ApiError;
