"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production']),
    PORT: zod_1.z.coerce.number().int().min(1000),
    BCRYPT_SALT_ROUNDS: zod_1.z.coerce.number().min(5),
});
const values = envSchema.parse(process.env);
exports.default = values;
