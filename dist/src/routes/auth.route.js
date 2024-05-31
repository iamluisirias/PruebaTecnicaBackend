"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
router.post('/login', async function (req, res) {
    // Checking the values received
    const values = await schemas_1.validateLoginSchema.parseAsync(req.body);
    // trying the response
    const response = await (0, auth_controller_1.loginController)(values);
    return res.status(response.statusCode).json(response);
});
exports.default = router;
