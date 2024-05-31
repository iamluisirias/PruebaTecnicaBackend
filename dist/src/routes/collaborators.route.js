"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schemas_1 = require("../schemas");
const user_1 = require("../controllers/user");
const collaborators_controller_1 = require("../controllers/collaborators.controller");
const router = (0, express_1.Router)();
router.post('/collaborators', async function (req, res) {
    const values = await schemas_1.validateCollaboratorSchema.parseAsync(req.body);
    const response = await (0, collaborators_controller_1.createCollaborator)(values);
    return res.status(response.statusCode).json(response);
});
router.get('/collaborators', async function (req, res) {
    // Checking the values received
    const values = await schemas_1.validateCollaboratorSchema.parseAsync(req.body);
    // trynd the response
    const response = await (0, user_1.userController)(values);
    return res.status(response.statusCode).json(response);
});
exports.default = router;
