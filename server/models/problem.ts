import * as Sequelize from 'sequelize';
import * as Solution from './solution';
import * as Group from './group';
import * as Teacher from './teacher';
import * as Answer from './answer';
import * as Topic from './topic';
import * as Difficulty from './difficulty';
import { Solution as SolutionModel } from './db';
import { constants } from './../constants';
import * as _ from 'lodash';

export interface Pojo {
    problem: string;
    url?: string;
    solutions?: Solution.Pojo[];
    correctSolutions?: Solution.Pojo[];
    group?: Group.Pojo;
    teacher?: Teacher.Pojo;
    answers?: Answer.Pojo[];
    topic?: Topic.Pojo;
    difficulty?: Difficulty.Pojo;
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {
  Random: (request?) => Promise<Instance>;
};

export function define(sequelize: Sequelize.Sequelize): Model {
    var model: Model = <Model> sequelize.define<Instance, Pojo>('Problem', {
        problem: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 256]

            }
        },
        url: {
          type: Sequelize.VIRTUAL,
          get: function() {
            return `${constants.IMG_API_SERVER_ADDRESS}api/p${this.getDataValue('id')}`;
          }
        }
    }, {
        paranoid: true,
        classMethods: {
          Random: function(req?) {
            return new Promise<Instance>((resolve, reject) => {
              var where = req ? req.where || {} : {};
              var bodyQuery = _.pick(req.body, ['groupId', 'difficultyId', 'topicId']);
              where = _.merge(where, bodyQuery);
              where = _.pick(where, ['groupId', 'difficultyId', 'topicId']);
              this.findAll({
                where,
                include: [{
                  model: SolutionModel,
                  as: 'solutions'
                }]
              })
              .then((problems) => {
                resolve(problems[Math.floor(Math.random() * problems.length)]);
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              });
            });
          }
        },
        freezeTableName: true // StudentModel tableName will be the same as the model name
    });

    return model;
}
