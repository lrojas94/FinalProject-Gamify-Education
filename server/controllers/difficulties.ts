import * as express from 'express';
import { Difficulty } from './../models/db';
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
      }
    }
});

export default router;
