import * as Sequelize from 'sequelize';
import lang from '../messages';

export interface Pojo {
    name: String;
    telephone: String;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
    var model: Model = <Model> sequelize.define<Instance, Pojo>('School', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        telephone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
              }
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return model;

};
