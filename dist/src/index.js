"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./routes/auth.route"));
function routerApi(app) {
    app.use(auth_route_1.default);
    // other routes here
}
exports.default = routerApi;
