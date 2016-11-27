import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import * as _ from 'lodash';
import { Teacher, Student, Person, Problem, Answer, Topic, Group, Solution, DB, Difficulty } from '../models/db';
import {constants, ResponseMessage, QueryStatus, JWTTokenValues} from '../constants';
import studentRouter from './students';
import problemRouter from './problems';
import answerRouter from './answer';
import teacherRouter from './teachers';
import difficultyRouter from './difficulties';
import topicsRouter from './topics';
import schoolsRouter from './schools';
import groupsRouter from './groups';
import achievementsRouter from './achievements';


var router = express.Router();
/**
 * POST: http://localhost:3000/api/authenticate
 * @param  {[string]} '/authenticate'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 */
router.post('/authenticate', (req, res) => {
    var result: ResponseMessage = {};
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
            username: teacher.username,
            type: 'TEACHER',
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

router.post('/authenticate-est', (req, res) => {
    var result: ResponseMessage = {};
    Student.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        },
        include: [{
            model: Person,
            as: 'person'
        }]
    })
    .then((student) => {
        // Generate token values
        var tokenValues: JWTTokenValues = {
            name: student.person.name,
            username: student.username,
            type: 'STUDENT',
        };
        // Create token
        var token = jwt.sign(tokenValues, constants.JWT_SECRET);
        var json = _.assign(tokenValues, { token, name: student.person.name, lastName: student.person.lastName });
        json['id'] = student['id'];
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
router.get('/home', (req, res) => {
    if (req['userType'] !== 'TEACHER') {
        return res.send(401, 'Unauthorized');
    }
    var teacher = req.user;

    Group.findAll({
        attributes: [
            'id',
            'year',
            'grade',
            'teacherId',
            [DB.fn('COUNT', 'problems.solutions.answers.id'), 'totalAnswers'],
            [DB.fn('SUM', DB.cast(DB.col('problems.solutions.isCorrect'), 'int')), 'correctAnswers']
        ],
        where: {
            teacherId: teacher.id
        },
        include: [{
            model: Problem,
            as: 'problems',
            attributes: [],
            required: true,
            include: [{
                model: Solution,
                attributes: [],
                as: 'solutions',
                required: true,
                include: [{
                    model: Answer,
                    as: 'answers',
                    attributes: [],
                    required: true,
                }]
            }]
        }, {
            model: Topic,
            as: 'topics',
            separate: true,
            attributes: [
                'id',
                'name',
                'groupId',
                [DB.fn('COUNT', 'problems.solutions.answers.id'), 'totalAnswers'],
                [DB.fn('SUM', DB.cast(DB.col('problems.solutions.isCorrect'), 'int')), 'correctAnswers'],
            ],
            include: [{
                model: Problem,
                attributes: [],
                as: 'problems',
                required: true,
                include: [{
                    model: Solution,
                    attributes: [],
                    as: 'solutions',
                    required: true,
                    include: [{
                        model: Answer,
                        as: 'answers',
                        attributes: [],
                        required: true,
                    }]
                }]
            }],
            group: ['Topic.id', 'Topic.name', 'Topic.groupId']
        }, {
            model: Difficulty,
            as: 'difficulties',
            separate: true,
            attributes: [
                'id',
                'name',
                'groupId',
                [DB.fn('COUNT', 'problems.solutions.answers.id'), 'totalAnswers'],
                [DB.fn('SUM', DB.cast(DB.col('problems.solutions.isCorrect'), 'int')), 'correctAnswers'],
            ],
            include: [{
                model: Problem,
                attributes: [],
                as: 'problems',
                required: true,
                include: [{
                    model: Solution,
                    attributes: [],
                    as: 'solutions',
                    required: true,
                    include: [{
                        model: Answer,
                        as: 'answers',
                        attributes: [],
                        required: true,
                    }]
                }]
            }],
            group: ['Difficulty.id', 'Difficulty.name', 'Difficulty.groupId']
        }],
        group: ['Group.id']
    })
    .then((problems) => {
        return res.json({
            status: 0,
            data: problems
        });
    })
    .catch((err) => {
        return res.json({
            status: 1,
            data: err,
            message: 'There was an error querying for general group information.'
        });
    });
});


router.use('/students', studentRouter.router);
router.use('/problems', problemRouter);
router.use('/answers', answerRouter);
router.use('/teachers', teacherRouter.router);
router.use('/difficultys', difficultyRouter.router);
router.use('/topics', topicsRouter.router);
router.use('/groups', groupsRouter.router);
router.use('/schools', schoolsRouter.router);
router.use('/achievements', achievementsRouter.router);

export default router;
