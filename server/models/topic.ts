import * as Sequelize from 'sequelize';
import * as Problem from './problem';
import * as Group from './group';

export interface Pojo {
  name: string;
  description: string;
  example: string;
  problems?: Problem.Pojo[];
  group?: Group.Pojo;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
  var model: Model = <Model> sequelize.define<Instance, Pojo>('Topic', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 256]
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    example: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return model;
};
