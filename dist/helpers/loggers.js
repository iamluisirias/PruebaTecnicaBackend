"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLog = exports.errorLog = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const dayjs_1 = __importDefault(require("dayjs"));
const path_1 = require("path");
const timeZone = () => new Date().toLocaleDateString('en-Es', {
    timeZone: 'America/Tegucigalpa',
    minute: '2-digit',
    hour: '2-digit',
});
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: timeZone }), winston_1.default.format.prettyPrint());
const transportOptions = {
    filename: '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '90d',
    maxSize: '6m',
};
const infoTransportLogger = new winston_daily_rotate_file_1.default({
    ...transportOptions,
    dirname: (0, path_1.join)(__dirname, `../logs/info/${(0, dayjs_1.default)().format('MM-YYYY')}`),
});
const errorTransportLogger = new winston_daily_rotate_file_1.default({
    ...transportOptions,
    dirname: (0, path_1.join)(__dirname, `../logs/error/${(0, dayjs_1.default)().format('MM-YYYY')}`),
});
exports.errorLog = winston_1.default.createLogger({
    level: 'error',
    format: logFormat,
    transports: [errorTransportLogger],
});
exports.infoLog = winston_1.default.createLogger({
    level: 'info',
    format: logFormat,
    transports: [infoTransportLogger],
});
