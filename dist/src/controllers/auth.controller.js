"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const helpers_1 = require("../../helpers");
const User = require('../../models/user');
async function loginController(body) {
    const { password } = body;
    // manage errors
    if (password.length < 6) {
        throw new helpers_1.ApiError({
            statusCode: 400,
            message: 'Invalid password',
            title: 'Warning',
        });
    }
    let authenticated = false;
    // get user with that email
    const user = await User.findAll();
    console.log(user);
    // Something happened
    // all good
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            authenticated,
            email: body.email,
            username: 'example',
            rol: 'admin',
        },
        title: 'Success',
    });
}
exports.loginController = loginController;
