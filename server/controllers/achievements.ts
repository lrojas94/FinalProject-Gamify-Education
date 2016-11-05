import * as express from 'express';
import { Achievement } from './../models/db';
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
        searchAttributes: ['name', 'description', 'thresholdPercent', 'thresholdQuantity']
      },
      options: {
        attributes: ['name']
      }
    }
});


export default router;
