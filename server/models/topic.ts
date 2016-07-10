import * as Sequelize from 'sequelize';

export interface Pojo {
  name: string;
  direction: string;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
  var model: Model = <Model> sequelize.define<Instance, Pojo>('School', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 3
      }
    },
    direction: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return model;
};
