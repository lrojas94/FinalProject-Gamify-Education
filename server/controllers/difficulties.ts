import * as express from 'express';
import * as _ from 'lodash';
import { Difficulty, DB, Problem, Solution, Answer, Topic } from './../models/db';
import simpleRouter from './../utility/simpleRouter';

var router = simpleRouter({
    model: Difficulty,
    url: '/difficulties',
    modelName: 'Difficulty',
    attributes: ['id', 'name', 'description'],
    opts: {
      list: {
        model: Difficulty,
        attributes: ['id', 'name', 'description'],
        url: '/difficulties',
        searchAttributes: ['name']
      },
      options: {
        attributes: ['name'],
    },
    middlewares: {
        get: (req, res, next) => {
            Difficulty.find({
                attributes: [
                    'id',
                    'name',
                    'description',
                    [DB.fn('COUNT', 'problems.solutions.answers.id'), 'totalAnswers'] as any,
                    [DB.fn('SUM', DB.cast(DB.col('problems.solutions.isCorrect'), 'int')), 'correctAnswers'] as any,
                ],
                where: {
                    id: req.params.id
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
                group: ['Difficulty.id', 'Difficulty.name', 'Difficulty.description']
            })
            .then((difficulty) => {
                if (difficulty === null) {
                    Difficulty.find({
                        attributes: ['id', 'name', 'description'],
                        where: {
                            id: req.params.id
                        }
                    })
                    .then((d) => {
                        req['result'] = d;
                        next();
                    });
                }
                else {
                    Topic.findAll({
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
                                difficultyId: difficulty['id']
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
                        group: ['Topic.id', 'Topic.name']
                    })
                    .then((topics) => {
                        difficulty.setDataValue('topics', topics);
                        req['result'] = difficulty;
                        next();
                    });
                }
            });
        }
    }
    }
});


export default router;
