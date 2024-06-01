"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const collaborator_route_1 = __importDefault(require("./routes/collaborator.route"));
function routerApi(app) {
    app.use('/api', auth_route_1.default, collaborator_route_1.default);
}
exports.default = routerApi;
