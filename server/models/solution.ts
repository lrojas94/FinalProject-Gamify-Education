import * as Sequelize from 'sequelize';
import * as Problem from './problem';
import * as Answer from './answer';
import { constants } from './../constants';

export interface Pojo {
    solution: string;
    isCorrect?: boolean;
    problemId?: number;
    problem?: Problem.Pojo;
    answers?: Answer.Pojo[];
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
        },
        isCorrect: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        url: {
          type: Sequelize.VIRTUAL,
          // NOTE: It is important that getters/setters use function() instead of () => {}.
          get: function() {
            return `${constants.IMG_API_SERVER_ADDRESS}api/p${this.getDataValue('problemId')}_s${this.getDataValue('id')}`;
          }
        }
    }, {
        freezeTableName: true // StudentModel tableName will be the same as the model name
    });

    return model;
}
