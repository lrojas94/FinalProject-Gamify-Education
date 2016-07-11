import * as Sequelize from 'sequelize';
import * as Person from './person';
import * as Group from './group';
import * as School from './school';
import * as Answer from './answer';

export interface Pojo {
    username: string;
    password: string;
    studentId?: string;
    person?: Person.Pojo;
    personId?: number;
    group?: Group.Pojo;
    school?: School.Pojo;
    answers?: Answer.Pojo[];
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {};

export function define(sequelize: Sequelize.Sequelize): Model {
    var model: Model = <Model> sequelize.define<Instance, Pojo>('Student', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 6
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 3
            }
        },
        studentId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                min: 7
            }
        },
        personId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'Person',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true // StudentModel tableName will be the same as the model name
    });

    return model;
}
