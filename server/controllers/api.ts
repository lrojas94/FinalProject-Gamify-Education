import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import * as _ from 'lodash';
import { Teacher, Student, Person } from '../models/db';
import {constants, ResponseMessage, QueryStatus, JWTTokenValues} from '../constants';
import studentRouter from './students';
import problemRouter from './problems';
import answerRouter from './answer';
import teacherRouter from './teachers';
import difficultyRouter from './difficulties';
import topicsRouter from './topics';
import schoolsRouter from './schools';
import groupsRouter from './groups';


var router = express.Router();
/**
 * POST: http://localhost:3000/api/authenticate
 * @param  {[string]} '/authenticate'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 */
router.post('/authenticate', (req, res) => {
    var result: ResponseMessage = {};
    console.log(req.body);
    Teacher.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        },
        include: [{
            model: Person,
            as: 'person'
        }]
    })
    .then((teacher) => {
        // Generate token values
        var tokenValues: JWTTokenValues = {
            name: teacher.person.name,
            username: teacher.username
        };

        // Create token
        var token = jwt.sign(tokenValues, constants.JWT_SECRET);

        var json = _.assign(tokenValues, { token, name: teacher.person.name, lastName: teacher.person.lastName });

        result.status = QueryStatus.SUCCESS;
        result.message = 'Login Successful';
        result.data = json;

        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        result.status = QueryStatus.ERROR;
        result.message = 'Login Unsuccessful. Wrong username or password.';
        result.data = err;
        res.json(result);
    });
});

router.use(passport.authenticate('jwt', { session: false }));

/**
 * GET: http://localhost:3000/api
 * @param  {[string]} '/'         [Route]
 * @param  {[callback]} (req,res) [Request and Response Headers]
 */

router.use('/students', studentRouter);
router.use('/problems', problemRouter);
router.use('/answers', answerRouter);
router.use('/teachers', teacherRouter.router);
router.use('/difficultys', difficultyRouter.router);
router.use('/topics', topicsRouter.router);
router.use('/groups', groupsRouter.router);
router.use('/schools', schoolsRouter.router);

export default router;
