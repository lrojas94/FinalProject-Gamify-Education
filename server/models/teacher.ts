import * as Sequelize from 'sequelize';
import * as Person from './person';
import * as Group from './group';
import * as School from './school';
import * as Problem from './problem';

export interface Pojo {
  username: string;
  password: string;
  degree?: string;
  person?: Person.Pojo;
  personId?: number;
  groups?: Group.Pojo[];
  school?: School.Pojo;
  problems?: Problem.Pojo[];
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
        len: [5, 256]
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 256]
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
      allowNull: true
    }
  }, {
    freezeTableName: true, // TeacherModel tableName will be the same as the model name
  });

  return model;
};
