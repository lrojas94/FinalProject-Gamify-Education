import * as Student from './student';
import * as Teacher from './teacher';
import * as Group from './group';
import * as Sequelize from 'sequelize';

export interface Pojo {
  name: string;
  address: string;
  telephone: string;
  website?: string;
  groups?: Group.Pojo[];
  students?: Student.Pojo[];
  teachers?: Teacher.Pojo[];
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
  var model: Model = <Model> sequelize.define<Instance, Pojo>('School', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        min: 3
      }
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        min: 10
      }
    },
    telephone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    website: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return model;
};
