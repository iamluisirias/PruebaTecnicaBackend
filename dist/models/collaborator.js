'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    // order of InferAttributes & InferCreationAttributes is important.
    class Collaborator extends sequelize_1.Model {
    }
    Collaborator.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        job: DataTypes.STRING,
        identity: {
            type: DataTypes.STRING,
            unique: true,
        },
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'collaborators',
    });
    return Collaborator;
};
