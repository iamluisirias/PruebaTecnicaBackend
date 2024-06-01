"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schemas_1 = require("../schemas");
const basic_auth_1 = __importDefault(require("../middlewares/basic-auth"));
const collaborator_controller_1 = require("../controllers/collaborator.controller");
const router = (0, express_1.Router)();
router.post('/collaborator', basic_auth_1.default, async function (req, res) {
    const values = await schemas_1.validateCollaboratorSchema.parseAsync(req.body);
    const response = await (0, collaborator_controller_1.createCollaborator)(values);
    return res.status(response.statusCode).json(response);
});
router.get('/collaborator/:id', basic_auth_1.default, async function (req, res) {
    // trying the response
    const response = await (0, collaborator_controller_1.getCollaborator)(req.params.id);
    return res.status(response.statusCode).json(response);
});
router.get('/collaborators', basic_auth_1.default, async function (req, res) {
    //the response
    const response = await (0, collaborator_controller_1.getCollaborators)();
    return res.status(response.statusCode).json(response);
});
router.put('/collaborator/:id', basic_auth_1.default, async function (req, res) {
    const id = req.params.id;
    // Checking the values received
    const values = await schemas_1.validateCollaboratorSchema.parseAsync(req.body);
    // trying the response
    const response = await (0, collaborator_controller_1.updateCollaborator)(values, id);
    return res.status(response.statusCode).json(response);
});
router.delete('/collaborator/:id', basic_auth_1.default, async function (req, res) {
    // trynd the response
    const response = await (0, collaborator_controller_1.deleteCollaborator)(req.params.id);
    return res.status(response.statusCode).json(response);
});
exports.default = router;
