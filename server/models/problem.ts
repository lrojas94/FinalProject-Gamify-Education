import * as Sequelize from 'sequelize';
import * as Solution from './solution';

export interface Pojo {
    problem: string;
    solutions?: Solution.Pojo[];
    // Group
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
    var model: Model = <Model> sequelize.define<Instance, Pojo>('Problem', {
        problem: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 6
            }
        },
    }, {
        freezeTableName: true // StudentModel tableName will be the same as the model name
    });

    return model;
}
