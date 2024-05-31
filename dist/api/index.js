"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./v1/example/router"));
function routerApi(app) {
    app.use('/api', router_1.default);
}
exports.default = routerApi;
