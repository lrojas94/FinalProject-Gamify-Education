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
                notEmpty: true,
                isIn: {
                    args: [['^[a-z]+$', 'i']],
                    msg: lang.es.errors.db.school.nameValidation
                }
            }
        },
        telephone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: {
                    args: [['^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$']],
                    msg: lang.es.errors.db.school.telephoneValidation
                }
            }
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return model;

};
