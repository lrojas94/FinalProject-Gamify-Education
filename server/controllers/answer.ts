import * as _ from 'lodash';
import * as express from 'express';
import * as sequelize from 'sequelize';
import * as rp from 'request-promise';
import { constants } from './../constants';
import { Pojo as SolutionPojo } from '../models/solution';
import { Student, Problem, Solution, Answer, DB, Achievement } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';


var router = express.Router();
/**
 * POST: http://localhost:3000/api/problems/
 * @param  {[string]} '/'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 * @return {[json]}         [List of all problems.]
 */
router.get('/', (req, res) => {
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
      // here we got the answer.
      Solution.findAll({
          attributes: [
              'id',
              [
                  sequelize.fn('COUNT', sequelize.col('answers.id')), 'answersCount'
              ],
              'isCorrect'
          ],
          include: [{model: Answer, as: 'answers', attributes: []}, {model: Problem, as: 'problem', attributes: []}],
          where: {
              '$answers.studentId$': req.user.id,
              '$problem.topicId$': req.body.topicId,
              '$problem.difficultyId$': req.body.difficultyId,
          },
          group: ['Solution.id', 'Solution.isCorrect']
      })
      .then((solutions) => {
          var totalAnswers = _.reduce(solutions, (sum, sol) => {
              return sum + parseInt(sol.get('answersCount'));
          }, 0);
          var correctAnswers = _.reduce(solutions, (sum, sol) => {
              return sol.isCorrect ? sum + parseInt(sol.get('answersCount')) : sum;
          }, 0);

          console.log(`Total answers in topic with diff.: ${totalAnswers} | Correct: ${correctAnswers}`);
          Achievement.findAll({
              where: {
                  topicId: req.body.topicId,
                  difficultyId: req.body.difficultyId,
                  $or: [
                      {
                          thresholdQuantity : {
                              $lte: correctAnswers
                          },
                      },
                      {
                          thresholdPercent: {
                              $lte: 100 * (correctAnswers / totalAnswers)
                          },
                      }
                  ],
                  '$completedBy.StudentAchievements.studentId$': null
              },
              include: [{ model: Student, as: 'completedBy', through: {
                  attributes: ['id'],
                  where: {
                      studentId: req.user.id
                  }
              }, attributes: ['id'] }]
          })
          .then((unlockedAchievements) => {
              // there we have some unlocked achievements dude :D!
              console.log(unlockedAchievements);
              answer['getStudent']()
              .then((student) => {
                  student.addAchivements(unlockedAchievements)
                  .then((student) => {
                    // now return problem:
                    //
                    req['where'] = _.merge(req['where'] || {}, {
                        topicId: req.body.topicId,
                        difficultyId: req.body.difficultyId
                    });

                    Problem.Random(req)
                    .then((problem) => {
                        result = {
                            status: QueryStatus.SUCCESS,
                            message: 'Answer added correctly',
                            data: {
                                answer,
                                newProblem: problem,
                                unlockedAchievements: unlockedAchievements
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
                });
              });

          })
          .catch((err) => {
              console.log(err);
          });
      })
      .catch((err) => {
          console.log(err);
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
