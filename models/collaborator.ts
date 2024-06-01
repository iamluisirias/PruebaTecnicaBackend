'use strict';

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import type { Sequelize } from 'sequelize/types';

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  // order of InferAttributes & InferCreationAttributes is important.
  class Collaborator extends Model<
    InferAttributes<Collaborator>,
    InferCreationAttributes<Collaborator>
  > {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare firstName: string;
    declare lastName: string;
    declare job: string;
    declare identity: string;
    declare phone: string;
    declare email: string;
    declare password: string;
  }

  Collaborator.init(
    {
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
    },
    {
      sequelize,
      tableName: 'collaborators',
    }
  );

  return Collaborator;
};
