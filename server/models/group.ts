import * as Sequelize from 'sequelize';
import * as Student from './student';
import * as School from './school';
import * as Teacher from './teacher';
import lang from '../messages';

export interface Pojo {
    year: string;
    grade: string;
    students?: Student.Pojo[];
    teacher?: Teacher.Pojo;
    school?: School.Pojo;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
    var model: Model = <Model> sequelize.define<Instance, Pojo>('Group', {
        year: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        grade: {
            type: Sequelize.STRING,
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
