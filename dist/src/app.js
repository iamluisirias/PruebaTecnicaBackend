"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./index"));
const db = require('../models');
const errorHandler_1 = require("../helpers/errorHandler");
try {
    //For env File
    dotenv_1.default.config();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    // Puerto de la app
    const port = process.env.PORT || 3000;
    (0, index_1.default)(app);
    app.use(errorHandler_1.errorHandler);
    db.sequelize.sync().then(() => {
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    });
}
catch (error) {
    console.log(error);
    process.exit(1);
}
