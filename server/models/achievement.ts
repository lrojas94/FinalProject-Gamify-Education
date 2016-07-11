import * as Sequelize from 'sequelize';
import * as Topic from './topic';

export interface Pojo {
  name: string;
  description: string;
  thresholdQuantity: number; // Minimum ammount of problems realized.
  thresholdPercent: number; // % of good problems on the topic.
  iconUrl: string;
  difficulty?: Object;
  topic?: Topic.Pojo;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
  var model: Model = <Model> sequelize.define<Instance, Pojo>('Achievement', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 3
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    thresholdQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    thresholdPercent: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    iconUrl: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return model;
};
