import * as _ from 'lodash';
import * as express from 'express';
import * as sequelize from 'sequelize';
import { Pojo as SolutionPojo } from '../models/solution';
import { Student, Problem, Solution, DB } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';


var router = express.Router();
/**
 * POST: http://localhost:3000/api/problems/
 * @param  {[string]} '/'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 * @return {[json]}         [List of all problems.]
 */
router.post('/', (req, res) => {
    var result: ResponseMessage = {};

    Problem.findAll({
      include: [{
        model: Solution,
        as: 'solutions'
      }]
    })
    .then((problems) => {
        result.status = QueryStatus.SUCCESS;
        result.message = 'Successful query.';
        result.data = problems;
        res.json(result);
    })
    .catch((err) => {
        result.status = QueryStatus.ERROR;
        result.message = 'There was an error querying all the users.';
        result.data = err;
        res.json(result);
    });
});

router.post('/random', (req, res) => {
  var result: ResponseMessage = {};
  // should be good to actually send in the request the id's of ones solved.
  Problem.findAll({
    include: [{
      model: Solution,
      as: 'solutions'
    }]
  })
  .then((problems) => {
    result = {
      status: QueryStatus.SUCCESS,
      message: 'Random problem sent',
      data: problems[Math.floor(Math.random() * problems.length)]
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

router.post('/add', (req, res) => {
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
          });
      });
    })
    .then(() => {
      // After creation, no data should be expected.
      result = {
        status: QueryStatus.SUCCESS,
        message: 'Problem and solutions were created'
      };

      res.json(result);
    })
    .catch((err) => {
      result = {
        status: QueryStatus.ERROR,
        message: 'Error creating problem or solutions.',
        data: err
      };

      res.json(err);
    });


});

export default router;
