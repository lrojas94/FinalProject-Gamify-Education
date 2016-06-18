import * as Sequelize from 'sequelize';
import lang from '../messages';

export interface Pojo {
  name: String;
  lastName: String;
  birthDay: Date;
  gender: String;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
  var model: Model = <Model> sequelize.define<Instance, Pojo>('Person', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 3
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 3
      }
    },
    birthDay: {
      type: Sequelize.DATE,
      allowNull: false
    },
    gender: {
      type: Sequelize.CHAR(1),
      allowNull: false,
      validate: {
        isIn: {
          args: [['m', 'f']],
          msg: lang.es.errors.db.person.genderValidation
        }
      }
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return model;
};
