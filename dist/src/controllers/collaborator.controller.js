"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollaborators = exports.getCollaborator = exports.deleteCollaborator = exports.updateCollaborator = exports.createCollaborator = void 0;
const helpers_1 = require("../../helpers");
async function createCollaborator(body) {
    const { email, firstName, job, lastName, password, phone } = body;
    if (password.length < 6) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid password',
            title: 'Warning',
        });
    }
    // var authenticated = false;
    // if (
    //   body.email == user.email &&
    //   (await compareHashedPassword(body.password, user.password))
    // ) {
    //   authenticated = true;
    // } else {
    //   throw new ApiError({
    //     statusCode: 401,
    //     message: 'Unauthorized',
    //     title: 'Error',
    //   });
    // }
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            authenticated: true,
            email: body.email,
            username: 'example',
            rol: 'admin',
        },
        title: 'Success',
    });
}
exports.createCollaborator = createCollaborator;
const updateCollaborator = (req, res) => { };
exports.updateCollaborator = updateCollaborator;
const deleteCollaborator = (req, res) => { };
exports.deleteCollaborator = deleteCollaborator;
const getCollaborator = (req, res) => { };
exports.getCollaborator = getCollaborator;
const getCollaborators = (req, res) => { };
exports.getCollaborators = getCollaborators;
