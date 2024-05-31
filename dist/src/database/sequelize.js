"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    define: {
        //!Se utiliza para no haya conflicto de columnas en consultas
        //!con relacion a fecha de cracion y actualizacion de modelos en express
        //!Evitar pluralizacion en la busqueda de tablas
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
async function test_connection() {
    try {
        await sequelize.authenticate();
        console.log('Sequelize Conectado Exitosamente!');
        console.log('Happy Hacking!');
    }
    catch (error) {
        console.error('No fue posible crear la conexion con Sequelize', error);
        sequelize.close();
    }
}
test_connection();
module.exports = sequelize;
