import * as express from 'express';
import { School, Teacher } from './../models/db';
import simpleRouter from './../utility/simpleRouter';

var router = simpleRouter({
    model: School,
    url: '/schools',
    modelName: 'School',
    attributes: ['id', 'name', 'telephone', 'address', 'website'],
    opts: {
      list: {
        model: School,
        attributes: ['id', 'name', 'website'],
        url: '/schools',
        searchAttributes: ['name', 'website'],

      },
      options: {
        attributes: ['name']
      }
    }
});

export default router;
