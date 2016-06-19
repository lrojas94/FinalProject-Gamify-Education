import * as Sequelize from 'sequelize';
import * as Person from './person';

export interface Pojo {
  username: String;
  password: String;
  degree?: String;
  person?: Person.Pojo;
  personId?: Number;

}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
  var model: Model = <Model> sequelize.define<Instance, Pojo>('Teacher', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 6
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 3
      }
    },
    degree: {
      type: Sequelize.STRING,
      allowNull: true
    },
    personId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Person',
        key: 'id',
      },
      unique: true,
      allowNull: false
    }
  }, {
    freezeTableName: true, // TeacherModel tableName will be the same as the model name
  });

  return model;
};
