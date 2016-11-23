import * as express from 'express';
import { Topic, Problem, Answer, DB } from './../models/db';
import simpleRouter from './../utility/simpleRouter';

var router = simpleRouter({
    model: Topic,
    url: '/topics',
    modelName: 'Topic',
    attributes: ['id', 'name', 'description', 'example', 'groupId'],
    opts: {
      list: {
        model: Topic,
        attributes: ['id', 'name', 'description', 'example'],
        url: '/topics',
        searchAttributes: ['name', 'example'],
        // include: [{
        //     model: Problem, as: 'problems', attributes: ['id'],
        //     include: [{
        //         model: Answer, as: 'answers', attributes: [
        //             [DB.fn('COUNT', DB.col('problems.answers.id')), 'answers']
        //         ]
        //     }],
        // }],
      },
      options: {
        attributes: ['name']
      }
    }
});

export default router;
