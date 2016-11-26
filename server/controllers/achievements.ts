import * as express from 'express';
import * as _ from 'lodash';
import { Achievement, Topic, Student } from './../models/db';
import simpleRouter from './../utility/simpleRouter';

var router = simpleRouter({
    model: Achievement,
    url: '/achievements',
    modelName: 'Achievement',
    attributes: ['id', 'name', 'description', 'thresholdPercent', 'thresholdQuantity', 'iconUrl', 'difficultyId', 'topicId'],
    opts: {
      list: {
        model: Achievement,
        attributes: ['id', 'name', 'description', 'thresholdPercent', 'thresholdQuantity', 'iconUrl', 'difficultyId', 'topicId'],
        url: '/achievements',
        searchAttributes: ['name', 'description', 'thresholdPercent', 'thresholdQuantity'],
        include: [{ model: Topic, as: 'topic', required: true }, { model: Student, as: 'completedBy', addToThroughWhereFromRequest: {
            'id': 'user.id'
        }}]
      },
      options: {
        attributes: ['name']
      },
      middlewares: {
        list: (req, res, next) => {
          if (req['userType'] === 'STUDENT') {
            var student = req.user;
            // return only the ones for his group:
            req.where = {
              '$topic.groupId$' : student.groupId
            };
          }

          next();
        }
      }
    },
});


export default router;
