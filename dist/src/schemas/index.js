"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCollaboratorSchema = exports.validateLoginSchema = void 0;
const zod_1 = require("zod");
exports.validateLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.validateCollaboratorSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    job: zod_1.z.string(),
    // id: z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
