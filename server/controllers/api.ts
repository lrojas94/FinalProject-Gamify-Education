import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import { Teacher, Student, Person } from '../models/db';
import {constants, ResponseMessage, QueryStatus, JWTTokenValues} from '../constants';
import studentRouter from './students';
import problemRouter from './problems';
import answerRouter from './answer';


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

        var json = tokenValues;
        json[constants.JWT_BODY_PARAM] = token;

        result.status = QueryStatus.SUCCESS;
        result.message = 'Login Successful';
        result.data = json;

        res.json(result);
    })
    .catch((err) => {
        // console.log(err);
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
router.get('/', (req, res) => {
    console.log(req.query); // This is for a GET
    res.json({ 'data': 'Working' });
});

/**
 * POST: http://localhost:3000/api
 * @param  {[string]} '/'         [Route]
 * @param  {[callback]} (req,res) [Request and Response Headers]
 */
router.post('/', (req, res) => {
    console.log(req.body); // This is for a Post
    console.log(req.user);
    res.json({ 'data': 'Working' });
});

/**
 * POST: http:localhost:3000/api/profile
 * @param  {[string]}  '/profile'          [Route]
 * @param  {[callback]}  (req,res)         [Request and Response Headers]
 */
router.post('/profile', (req, res) => {
    res.json({
        success: 'You finally have access to your request!'
    });
});

router.use('/students', studentRouter);
router.use('/problems', problemRouter);
router.use('/answers', answerRouter);

export default router;
