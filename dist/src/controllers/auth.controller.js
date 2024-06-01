"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const helpers_1 = require("../../helpers");
const models = require('../../models');
async function loginController(body) {
    // manage errors
    if (body.password.length < 6) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid password',
            title: 'Warning',
        });
    }
    // get user with that email
    const user = await models.User.findOne({
        where: {
            email: body.email,
        },
    });
    // Something happened, validating data
    if (!user) {
        throw new helpers_1.ApiError({
            statusCode: 401,
            message: 'Unauthorized',
            title: 'Error',
        });
    }
    if (body.email !== user.email ||
        !(await (0, helpers_1.compareHashedPassword)(body.password, user.password))) {
        throw new helpers_1.ApiError({
            statusCode: 401,
            message: 'Unauthorized',
            title: 'Error',
        });
    }
    // all good
    // generate token
    const token = Buffer.from(`${body.email}:${body.password}`).toString('base64');
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            authenticated: true,
            email: body.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token,
            // username: 'example',
            // role: 'admin',
        },
        title: 'Success',
    });
}
exports.loginController = loginController;
async function registerController(body) {
    // manage errors
    if (body.password.length < 6) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid password',
            title: 'Warning',
        });
    }
    // Checking if user exists
    const possibleUser = await models.User.findOne({
        where: { email: body.email },
    });
    if (possibleUser) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'User already exists',
            title: 'Warning',
        });
    }
    // get user with that email
    const user = await models.User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await (0, helpers_1.hashPassword)(body.password),
    });
    console.log({ id: user.id });
    // all good
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            // username: 'example',
            // role: 'admin',
        },
        title: 'Success',
    });
}
exports.registerController = registerController;
