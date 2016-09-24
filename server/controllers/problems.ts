import * as _ from 'lodash';
import * as express from 'express';
import * as sequelize from 'sequelize';
import * as rp from 'request-promise';
import { constants } from './../constants';
import { Pojo as SolutionPojo } from '../models/solution';
import { Student, Problem, Solution, Teacher, Answer, DB } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';
import simpleRouter from './../utility/simpleRouter';
import solutionRouter from './solutions';


var router = simpleRouter({
    model: Problem,
    url: '/problems',
    modelName: 'Problem',
    attributes: ['id', 'problem', 'url'],
    opts: {
      list: {
        model: Problem,
        attributes: ['id', 'problem', 'url'],
        url: '/problems',
        include: [{ model: Solution, as: 'solutions'}],
        searchAttributes: ['problem', 'url']
      },
      view: {
        include: [{ model: Solution, as: 'solutions' }, { model: Teacher, as: 'teacher' }, { model: Answer, as: 'answers'}]
      },
      upsert: {
        onUpsert: (data: any) => {
          return new Promise((resolve, reject) => {
            data.getSolutions()
            .then((solutions) => {
              data.setDataValue('solutions', solutions);
              rp({
                method: 'POST',
                uri: `${constants.IMG_API_SERVER_ADDRESS}api/problem/create`,
                body: data,
                json: true
              })
              .then((responseData: ResponseMessage) => {
                if (responseData.status === QueryStatus.SUCCESS) {
                  resolve();
                }
                else {
                  reject(new Error('Upload was not Successful'));
                }
              })
              .catch((err) => {
                reject(err);
              });
            })
            .catch((err) => {
              reject(err);
            });
          });
        },
        include: [{
          isAssociation: true,
          upsert: solutionRouter.upsert,
          bodyPath: 'solutions',
          associationName: 'Solution',
        }]
      }
    }
});


router.router.post('/random', (req, res) => {
  var result: ResponseMessage = {};
  // should be good to actually send in the request the id's of ones solved.
  Problem.Random()
  .then((problem) => {
    result = {
      status: QueryStatus.SUCCESS,
      message: 'Random problem sent',
      data: problem
    };

    res.json(result);
  })
  .catch((err) => {
    result = {
      status: QueryStatus.ERROR,
      message: 'Error getting a problem',
      data: err
    };

    res.json(result);
  });

});

router.router.post('/add', (req, res) => {
    var result: ResponseMessage = {};
    DB.transaction((transaction: sequelize.Transaction) => {
      // If there are no solutions, just create the problem:
      if (!req.body.solutions) {
        return Problem.create({
          problem: req.body.problem
        }, {
          transaction: transaction
        });
      }

      return Problem.create({
        problem: req.body.problem
      }, {
        transaction: transaction
      })
      .then((problem) => {
          // Problem was created
          // Create Solutions:
          if (!req.body.solutions) {
            result.status = QueryStatus.SUCCESS;
            result.message = 'Successful query.';
            result.data = problem;
            res.json(result);
            return;
          }

          var rawSolutions: string[] = req.body.solutions;
          // Map the problem ID to all items:
          var solutions: SolutionPojo[] = rawSolutions.map((solution) => {
            return {
              solution,
              problemId: problem.get('id')
            };
          });
          // Create all solutions:
          return Solution.bulkCreate(solutions, {
            transaction: transaction
          })
          .then(() => {
            return Problem.findOne({
              where: {
                id: problem.get('id')
              },
              include: [{
                model: Solution,
                as: 'solutions'
              }],
              transaction: transaction
            });
          });
      });
    })
    .then((problem) => {
    result = {
      status: QueryStatus.SUCCESS,
      message: 'Problem and solutions were created',
      data: problem
    };
    res.json(result);
      // After creation, no data should be expected.
      // Create images in API:
      rp({
        method: 'POST',
        uri: `${constants.IMG_API_SERVER_ADDRESS}api/problem/create`,
        body: problem,
        json: true
      })
      .then((data: ResponseMessage) => {
        if (data.status === QueryStatus.SUCCESS) {
          result = {
            status: QueryStatus.SUCCESS,
            message: 'Problem and solutions were created',
            data: problem
          };
          res.json(result);
        }
        else {
          result = {
            status: QueryStatus.ERROR,
            message: 'Problem Created and ImageAPI Upload successful, but ImageAPI Server returned error.',
            data: null
          };

          res.json(result);
        }
      })
      .catch((err) => {
        result = {
          status: QueryStatus.ERROR,
          message: 'Error uploading problem or solutions.',
          data: err
        };

        res.json(result);
      });

    })
    .catch((err) => {
      result = {
        status: QueryStatus.ERROR,
        message: 'Error creating problem or solutions.',
        data: err
      };

      res.json(result);
    });


});

export default router.router;
