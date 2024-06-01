"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollaborator = exports.updateCollaborator = exports.getCollaborators = exports.getCollaborator = exports.createCollaborator = void 0;
const helpers_1 = require("../../helpers");
const models = require('../../models');
async function createCollaborator(body) {
    // const { email, firstName, job, lastName, password, phone } = body;
    if (body.password.length < 6) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid password',
            title: 'Warning',
        });
    }
    if (body.firstName === '' ||
        body.lastName === '' ||
        body.job === '' ||
        body.phone === '' ||
        body.email === '') {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid data',
            title: 'Warning',
        });
    }
    const collaborator = await models.Collaborator.create({
        firstName: body.firstName,
        lastName: body.lastName,
        job: body.job,
        identity: body.identity,
        phone: body.phone,
        email: body.email,
        password: await (0, helpers_1.hashPassword)(body.password),
    });
    // all good
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            id: collaborator.id,
            firstName: collaborator.firstName,
            lastName: collaborator.lastName,
            email: collaborator.email,
        },
        title: 'Success',
    });
}
exports.createCollaborator = createCollaborator;
async function getCollaborator(id) {
    const collaborator = await models.Collaborator.findOne({
        where: {
            id,
        },
    });
    if (!collaborator) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid collaborator',
            title: 'Warning',
        });
    }
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            id: collaborator.id,
            firstName: collaborator.firstName,
            lastName: collaborator.lastName,
            email: collaborator.email,
        },
        title: 'Success',
    });
}
exports.getCollaborator = getCollaborator;
async function getCollaborators() {
    const collaborators = await models.Collaborator.findAll();
    if (!collaborators) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid collaborators',
            title: 'Warning',
        });
    }
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            collaborators,
        },
        title: 'Success',
    });
}
exports.getCollaborators = getCollaborators;
async function updateCollaborator(body, id) {
    if (body.password.length < 6) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid password',
            title: 'Warning',
        });
    }
    if (body.firstName === '' ||
        body.lastName === '' ||
        body.job === '' ||
        body.phone === '' ||
        body.email === '') {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid data',
            title: 'Warning',
        });
    }
    console.log('update collaborator');
    const collaborator = await models.Collaborator.findOne({
        where: {
            id,
        },
    });
    console.log(collaborator);
    if (!collaborator) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid collaborator',
            title: 'Warning',
        });
    }
    const updatedCollaborator = await models.Collaborator.update({
        firstName: body.firstName,
        lastName: body.lastName,
        job: body.job,
        identity: body.identity,
        phone: body.phone,
        email: body.email,
        password: await (0, helpers_1.hashPassword)(body.password),
    }, {
        where: {
            id,
        },
    });
    console.log({ updateCollaborator: collaborator.id });
    // all good
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            ...updatedCollaborator,
        },
        title: 'Success',
    });
}
exports.updateCollaborator = updateCollaborator;
async function deleteCollaborator(id) {
    const collaborator = await models.Collaborator.findOne({
        where: {
            id,
        },
    });
    if (!collaborator) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid collaborator',
            title: 'Warning',
        });
    }
    const deletedCollaborator = await models.Collaborator.destroy({
        where: {
            id,
        },
    });
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        title: 'Success',
    });
}
exports.deleteCollaborator = deleteCollaborator;
