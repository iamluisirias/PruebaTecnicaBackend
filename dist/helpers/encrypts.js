"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = exports.decrypt = exports.compareHashedPassword = exports.hashPassword = void 0;
var bcrypt = require('bcrypt');
var CryptoJS = require('crypto-js');
const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 12;
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(Number(saltRounds));
    return await bcrypt.hash(password, salt);
};
exports.hashPassword = hashPassword;
const compareHashedPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
exports.compareHashedPassword = compareHashedPassword;
function decrypt(data) {
    try {
        var bytes = CryptoJS.AES.decrypt(data, process.env.SecretKeyCrypto);
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }
    catch (error) {
        return null;
    }
}
exports.decrypt = decrypt;
async function encrypt(data) {
    var ciphertext = CryptoJS.AES.encrypt(data, process.env.SecretKeyCrypto).toString();
    return ciphertext;
}
exports.encrypt = encrypt;
