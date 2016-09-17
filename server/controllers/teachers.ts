import * as express from 'express';
import { Teacher, Person } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';
import simpleRouter from './../utility/simpleRouter';
import personRouter from './person';

/**
 * http://localhost:3000/api/teachers/
 * @param  {[string]} '/'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 * @return {[json]}         [List of all students.]
 */

var router = simpleRouter({
    model: Teacher,
    url: '/teachers',
    modelName: 'Teacher',
    attributes: ['id', 'username', 'password', 'degree', 'personId'],
    opts: {
      list: {
        model: Teacher,
        attributes: ['id', 'username', 'degree', 'personId'],
        url: '/teachers',
        include: [{ model: Person, as: 'person'}],
        searchAttributes: ['username', 'degree']
      },
      view: {
        include: [{ model: Person, as: 'person' }]
      },
      upsert: {
        include: [
          {
            bodyPath: 'person',
            upsert: personRouter.upsert,
            isAssociation: true,
            associationName: 'Person'
          }
        ],
        onUpsert: null
      }
    }
});

export default router;
