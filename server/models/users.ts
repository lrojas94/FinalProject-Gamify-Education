import * as Sequelize from 'sequelize';

export interface Pojo {
  firstName?: String,
  lastName?: String
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo{};
export interface Model extends Sequelize.Model<Instance,Pojo>{};

export function define(sequelize: Sequelize.Sequelize):Model{
  var userModelDef:Model = <Model> sequelize.define<Instance,Pojo>('User', {

    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

  return userModelDef;
};
