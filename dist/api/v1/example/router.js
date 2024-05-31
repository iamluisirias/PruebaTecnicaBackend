"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schemas_1 = require("./helpers/schemas");
const user_1 = require("./controller/user");
const router = (0, express_1.Router)();
const ruta = '/example';
router.post(ruta + '/login', 
/*Aqui va el middleware */ async function (req, res) {
    const values = await schemas_1.validateLoginSchema.parseAsync(req.body);
    const response = await (0, user_1.exampleController)(values);
    return res.status(response.statusCode).json(response);
});
exports.default = router;
