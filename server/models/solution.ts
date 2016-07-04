import * as Sequelize from 'sequelize';
import * as Problem from './problem';

export interface Pojo {
    solution: string;
    problemId?: number;
    problem?: Problem.Pojo;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
    var model: Model = <Model> sequelize.define<Instance, Pojo>('Solution', {
        solution: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 6
            }
        }
    }, {
        freezeTableName: true // StudentModel tableName will be the same as the model name
    });

    return model;
}
