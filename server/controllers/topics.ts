import * as express from 'express';
import { Topic, Problem, Answer, Solution, DB, Difficulty } from './../models/db';
import simpleRouter from './../utility/simpleRouter';

var router = simpleRouter({
    model: Topic,
    url: '/topics',
    modelName: 'Topic',
    attributes: ['id', 'name', 'description', 'example', 'groupId'],
    opts: {
      list: {
        model: Topic,
        attributes: ['id', 'name', 'description', 'example'] as any,
        url: '/topics',
        searchAttributes: ['name', 'example'],
      },
      options: {
        attributes: ['name']
      },
      middlewares: {
          get: (req, res, next) => {
              Topic.find({
                  attributes: [
                      'id',
                      'name',
                      'description',
                      'example',
                      'groupId',
                      [DB.fn('COUNT', 'problems.solutions.answers.id'), 'totalAnswers'] as any,
                      [DB.fn('SUM', DB.cast(DB.col('problems.solutions.isCorrect'), 'int')), 'correctAnswers'] as any,
                  ],
                  where: {
                      id: parseInt(req.params.id)
                  },
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
                          }]
                      }]
                  }],
                  group: ['Topic.id', 'Topic.name',
                  'Topic.groupId', 'Topic.example', 'Topic.description']
              })
              .then((topic) => {
                  // Find difficulties:
                  var finishRequest = (topic) => {
                      Difficulty.findAll({
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
                              where: {
                                  topicId: topic['id']
                              } as any,
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
                                  }]
                              }]
                          }] as any,
                          group: ['Difficulty.id', 'Difficulty.name']
                      })
                      .then((difficulties) => {
                          topic.setDataValue('difficulties', difficulties);
                          req['result'] = topic;
                          next();
                      });
                  };

                  if (topic === null) {
                    Topic.find({
                        attributes: [
                            'id',
                            'name',
                            'description',
                            'example',
                            'groupId',
                        ],
                        where: {
                            id: req.params.id
                        }
                    })
                    .then((t) => {
                        t.setDataValue('difficulties', []);
                        req['result'] = t;
                        next();
                    });
                  }
                  else {
                      finishRequest(topic);
                  }

              });
          },
          list: (req, res, next) => {
              if (req['userType'] === 'STUDENT') {
                  // query for students:
                  DB.query(`
                      SELECT "Topic".*,
                         COUNT("problems.answers".
                        "id") AS "totalAnswers", SUM(CAST("problems.answers.solution".
                        "isCorrect"
                        AS INT)) AS "correctAnswers"
                    FROM(SELECT "Topic".
                        "id", "Topic".
                        "name", "Topic".
                        "description", "Topic".
                        "example"
                        FROM "Topic"
                        AS "Topic"
                        WHERE "Topic".
                        "groupId" = :groupId AND(SELECT "topicId"
                            FROM "Problem"
                            AS "Problem"
                            WHERE("Problem".
                                "topicId" = "Topic".
                                "id"
                                AND "Problem".
                                "deletedAt"
                                IS NULL) LIMIT 1) IS NOT NULL LIMIT :limit OFFSET :offset) AS "Topic"
                    INNER JOIN "Problem"
                    AS "problems"
                    ON "Topic".
                    "id" = "problems".
                    "topicId"
                    AND "problems".
                    "deletedAt"
                    IS NULL LEFT OUTER JOIN "Answer"
                    AS "problems.answers"
                    ON "problems".
                    "id" = "problems.answers".
                    "problemId"
                    LEFT OUTER JOIN "Solution"
                    AS "problems.answers.solution"
                    ON "problems.answers".
                    "solutionId" = "problems.answers.solution".
                    "id"
                    GROUP BY "Topic".
                        "id", "Topic".
                        "name", "Topic".
                        "description", "Topic".
                        "example";
                      `, {
                        replacements: {
                            limit: req.query.limit,
                            offset: req.query.limit * (req.query.page - 1),
                            groupId: req.user.groupId
                        },
                        model: Topic
                      })
                      .then((topics) => {
                          console.log(topics);
                          Topic.count()
                          .then((count) => {
                              var limit = parseInt(req.query.limit);
                              var pages = Math.ceil(count / limit);
                              var current = parseInt(req.query.page);
                              var next = current >= pages ? 1 : current + 1;
                              return res.json({
                                  status: 0,
                                  data: topics,
                                  currentPage:current,
                                  next: next
                              });

                          })
                      })
                      .catch((err) => {
                          return res.json({
                              status: 1,
                              message: 'Error querying for topics',
                              data: err
                          });
                      });
              }
              else {
                  next();
              }
          }
      }
    }
});

export default router;
