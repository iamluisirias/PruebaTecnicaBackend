"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleController = void 0;
const helpers_1 = require("../../../../helpers");
const user = {
    email: "example@example.com",
    password: "$2a$12$xmU1v4tWlSpAKFUqDhQOV.5yhQWNLNsjohhVjvy9iay6qOH/GOU/y"
};
async function exampleController(body) {
    // manange errors
    if (body.password.length <= 6) {
        throw new helpers_1.ApiError({ statusCode: 400, message: 'Invalid password', title: "Warning" });
    }
    var authenticated = false;
    if (body.email == user.email && await (0, helpers_1.compareHashedPassword)(body.password, user.password)) {
        authenticated = true;
    }
    else {
        throw new helpers_1.ApiError({ statusCode: 401, message: 'Unauthorized', title: "Error" });
    }
    return new helpers_1.ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: { authenticated, email: body.email, username: "example", rol: "admin" },
        title: "Success"
    });
}
exports.exampleController = exampleController;
