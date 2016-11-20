import * as Sequelize from 'sequelize';
import * as Person from './person';
import * as Group from './group';
import * as Answer from './answer';
import * as Achievement from './achievement';

export interface Pojo {
    username: string;
    password: string;
    person?: Person.Pojo;
    personId?: number;
    group?: Group.Pojo;
    answers?: Answer.Pojo[];
    achievements?: Achievement.Pojo[];
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
                len: [6, 256]

            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 256]
            },
            defaultValue: 'default'
        },
        personId: {
            type: Sequelize.INTEGER,
            allowNull: true,
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
