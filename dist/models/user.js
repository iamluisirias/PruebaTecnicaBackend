'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    // order of InferAttributes & InferCreationAttributes is important.
    class User extends sequelize_1.Model {
    }
    User.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'users',
    });
    return User;
};
