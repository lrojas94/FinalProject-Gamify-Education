import * as Sequelize from 'sequelize';
import * as Student from './student';
import * as Problem from './problem';
import * as Solution from './solution';

export interface Pojo {
    studentId?: number;
    problemId?: number;
    solutionId?: number;
    student?: Student.Pojo;
    problem?: Problem.Pojo;
    solution?: Solution.Pojo;
    // Group
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
    var model: Model = <Model> sequelize.define<Instance, Pojo>('Answer', {
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Student',
                key: 'id'
            }
        },
        problemId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Problem',
                key: 'id'
            }
        },
        solutionId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Solution',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true // StudentModel tableName will be the same as the model name
    });

    return model;
}
