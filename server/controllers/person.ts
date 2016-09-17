import * as express from 'express';
import { Person } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';
import simpleRouter from './../utility/simpleRouter';

/**
 * http://localhost:3000/api/teachers/
 * @param  {[string]} '/'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 * @return {[json]}         [List of all students.]
 */

var router = simpleRouter({
    model: Person,
    url: '/persons',
    modelName: 'Person',
    attributes: ['id', 'name', 'lastName', 'birthDay', 'gender'],
    opts: {
      list: {
        model: Person,
        attributes: ['id', 'name', 'lastName', 'birthDay', 'gender'],
        url: '/teachers',
        searchAttributes: ['name', 'lastName']
      }
    }
});

export default router;
