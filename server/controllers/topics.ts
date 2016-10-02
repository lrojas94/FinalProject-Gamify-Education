import * as express from 'express';
import { Topic } from './../models/db';
import simpleRouter from './../utility/simpleRouter';

var router = simpleRouter({
    model: Topic,
    url: '/topics',
    modelName: 'Topic',
    attributes: ['id', 'name', 'description', 'example'],
    opts: {
      list: {
        model: Topic,
        attributes: ['id', 'name', 'description', 'example'],
        url: '/topics',
        searchAttributes: ['name', 'example']
      }
    }
});

export default router;
