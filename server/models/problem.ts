import * as Sequelize from 'sequelize';
import * as Solution from './solution';
import { Solution as SolutionModel } from './db';
import { constants } from './../constants';

export interface Pojo {
    problem: string;
    url?: string;
    solutions?: Solution.Pojo[];
    // Group
}

export interface Instance extends Sequelize.Instance<Pojo>, Pojo {};
export interface Model extends Sequelize.Model<Instance, Pojo> {
  Random: () => Promise<Instance>;
};

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
        url: {
          type: Sequelize.VIRTUAL,
          get: function() {
            return `${constants.IMG_API_SERVER_ADDRESS}api/p${this.getDataValue('id')}`;
          }
        }
    }, {
        classMethods: {
          Random: function() {
            return new Promise<Instance>((resolve, reject) => {
              this.findAll({
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
