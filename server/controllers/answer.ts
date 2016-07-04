import * as _ from 'lodash';
import * as express from 'express';
import * as sequelize from 'sequelize';
import * as rp from 'request-promise';
import { constants } from './../constants';
import { Pojo as SolutionPojo } from '../models/solution';
import { Student, Problem, Solution, Answer, DB } from './../models/db';
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

    Answer.findAll({
      include: [{
        model: Solution,
        as: 'solution'
      }, {
        model: Problem,
        as: 'problem'
      }, {
        model: Student,
        as: 'student'
      }]
    })
    .then((answers) => {
        result.status = QueryStatus.SUCCESS;
        result.message = 'Successful query.';
        result.data = answers;
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        result.status = QueryStatus.ERROR;
        result.message = 'There was an error querying all answers.';
        result.data = err;
        res.json(result);
    });
});

router.post('/add', (req, res) => {
    var result: ResponseMessage = {};
    Answer.create({
      studentId: req.body.studentId,
      problemId: req.body.problemId,
      solutionId: req.body.solutionId
    })
    .then((answer) => {
      Problem.Random()
      .then((problem) => {
        result = {
          status: QueryStatus.SUCCESS,
          message: 'Answer added correctly',
          data: {
            answer,
            newProblem: problem
          }
        };

        res.json(result);
      })
      .catch((err) => {
        result = {
          status: QueryStatus.ERROR,
          message: 'Answer added correctly, but there was an error trying to find a random problem.',
          data: {
            answer
          }
        };

        res.json(result);
      });
    })
    .catch((err) => {
      console.log(err);
      result.status = QueryStatus.ERROR;
      result.message = 'There was an error adding answer.';
      result.data = err;
      res.json(result);
    });

});

export default router;
