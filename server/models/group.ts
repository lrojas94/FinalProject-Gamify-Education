import * as Sequelize from 'sequelize';
import lang from '../messages';

export interface Pojo {
    year: String;
    grade: String;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
    var model: Model = <Model> sequelize.define<Instance, Pojo>('Group', {
        year: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: {
                    args: [['^\d{4}-\d{4}$']],
                    msg: lang.es.errors.db.group.yearValidation
                }
            }
        },
        grade: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: {
                    args: [['7', '8']],
                    msg: lang.es.errors.db.group.gradeValidation
                }
            }
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return model;

};
