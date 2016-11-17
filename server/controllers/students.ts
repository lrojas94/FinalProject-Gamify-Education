import * as express from 'express';
import { Student, Person, Group } from './../models/db';
import { ResponseMessage, QueryStatus } from './../constants';
import simpleRouter from './../utility/simpleRouter';
import personRouter from './person';

/**
 * http://localhost:3000/api/students/
 * @param  {[string]} '/'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 * @return {[json]}         [List of all students.]
 */

var router = simpleRouter({
    model: Student,
    url: '/students',
    modelName: 'Student',
    attributes: ['id', 'username', 'password', 'personId', 'groupId'],
    opts: {
      list: {
        model: Student,
        attributes: ['id', 'username', 'personId', 'groupId'],
        url: '/students',
        include: [{ model: Person, as: 'person', required: true}],
        searchAttributes: ['username', 'person.name', 'person.lastName']
      },
      view: {
        include: [{ model: Person, as: 'person' }, { model: Group, as: 'group' }]
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
      },
      options: {
        attributes: ['username']
      }
    }
});

export default router;
