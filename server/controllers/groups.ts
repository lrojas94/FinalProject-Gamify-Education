import * as express from 'express';
import { Group, School, Teacher } from './../models/db';
import simpleRouter from './../utility/simpleRouter';

var router = simpleRouter({
    model: Group,
    url: '/groups',
    modelName: 'Group',
    attributes: ['id', 'grade', 'year', 'teacherId', 'schoolId'],
    opts: {
      list: {
        model: Group,
        attributes: ['id', 'grade', 'year'],
        url: '/groups',
        searchAttributes: ['grade', 'year'],
        include: [
          { model: Teacher, as: 'teacher'},
          { model: School, as: 'school'}
        ],
      },
      view: {
        include: [
          { model: Teacher, as: 'teacher'},
          { model: School, as: 'school'}
        ]
      },
      options: {
        attributes: ['grade', 'year']
      },
      middlewares: {
          create: (req, res, next) => {
              if (req.body.group) {
                  req.body.group.teacherId = req.user.id;
              }
              next();
          }
      }
    }
});

export default router;
