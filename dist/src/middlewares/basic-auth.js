"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const auth = require('basic-auth');
const models = require('../../models');
const basicAuth = async (req, res, next) => {
    const credentials = await auth(req);
    if (!credentials || !check(credentials.name, credentials.pass)) {
        throw new helpers_1.ApiError({
            statusCode: 403,
            message: 'Forbidden',
            title: 'You need to sign In',
        });
    }
    next();
};
async function check(email, password) {
    const user = await models.User.findOne({ where: { email } });
    if (!user)
        return false;
    const result = await (0, helpers_1.compareHashedPassword)(password, user.password);
    return result;
}
exports.default = basicAuth;
