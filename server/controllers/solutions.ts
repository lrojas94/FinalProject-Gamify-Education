import * as express from 'express';
import { Solution } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';
import simpleRouter from './../utility/simpleRouter';

/**
 * http://localhost:3000/api/teachers/
 * @param  {[string]} '/'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 * @return {[json]}         [List of all students.]
 */

var router = simpleRouter({
    model: Solution,
    url: '/solutions',
    modelName: 'Solution',
    attributes: ['id', 'solution', 'isCorrect'],
    opts: {
      list: {
        model: Solution,
        attributes: ['id', 'solution', 'isCorrect', 'url'],
        url: '/solutions',
        searchAttributes: ['solution']
      }
    }
});

export default router;
