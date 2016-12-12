import * as express from 'express';
import * as _ from 'lodash';
import { Student, Person, Group, Topic, Difficulty, DB, Answer, Solution, Problem } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';
import simpleRouter from './../utility/simpleRouter';
import personRouter from './person';

/**
 * http://localhost:3000/api/students/
 * @param  {[string]} '/'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 * @return {[json]}         [List of all students.]
 */

var router = simpleRouter({
    model: Student,
    url: '/students',
    modelName: 'Student',
    attributes: ['id', 'username', 'password', 'personId', 'groupId'],
    opts: {
      list: {
        model: Student,
        attributes: ['id', 'username', 'personId', 'groupId'],
        url: '/students',
        include: [{ model: Person, as: 'person', required: true}],
        searchAttributes: ['username', 'person.name', 'person.lastName']
      },
      view: {
        include: [{ model: Person, as: 'person' }, { model: Group, as: 'group' }]
      },
      upsert: {
        include: [
          {
            bodyPath: 'person',
            upsert: personRouter.upsert,
            isAssociation: true,
            associationName: 'Person'
          }
        ],
        onUpsert: null
      },
      options: {
        attributes: ['username']
      },
      middlewares: {
          get: (req, res, next) => {
              Student.find({
                  attributes: ['id', 'username', 'password', 'personId', 'groupId'],
                  where: {
                      id: req.params.id
                  },
                  include: [{ model: Person, as: 'person' }, { model: Group, as: 'group' }]
              })
              .then((student) => {
                  // do per diff. and per topic Information:
                  var query = {
                      attributes: [
                          'id',
                          'name',
                          [DB.fn('COUNT', 'problems.solutions.answers.id'), 'totalAnswers'] as any,
                          [DB.fn('SUM', DB.cast(DB.col('problems.solutions.isCorrect'), 'int')), 'correctAnswers'] as any,
                      ],
                      include: [{
                          model: Problem,
                          attributes: [],
                          as: 'problems',
                          required: true,
                          include: [{
                              model: Solution,
                              attributes: [],
                              as: 'solutions',
                              required: true,
                              include: [{
                                  model: Answer,
                                  as: 'answers',
                                  attributes: [],
                                  required: true,
                                  where: {
                                      studentId: student['id']
                                  }
                              }]
                          }]
                      }],
                  };

                  var allPromise = Promise.all([
                      Difficulty.findAll(_.assign(query, { group: ['Difficulty.id', 'Difficulty.name']  })),
                      Topic.findAll(_.assign(query, { group: ['Topic.id', 'Topic.name']  }))
                  ])
                  .then((data) => {
                      var difficulties = data[0];
                      var topics = data[1]; // no idea what this has xD
                      student.setDataValue('topics', topics);
                      student.setDataValue('difficulties', difficulties);
                      req['result'] = student;
                      next();
                  });
              });
          }
      }
    }
});

export default router;
