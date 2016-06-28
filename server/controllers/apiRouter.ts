import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import * as db from '../models/db';
import {constants} from '../constants';
import {ResponseMessage} from '../constants';
import {QueryStatus} from '../constants';
import {JWTTokenValues} from '../constants';

var router = express.Router();

db.initialize();
const teacherDB = db.Teacher;
teacherDB.sync();
const studentDB = db.Student;
studentDB.sync();

/**
 * POST: http://localhost:3000/api/authenticate
 * @param  {[string]} '/authenticate'   [Route]
 * @param  {[callback]} (req,res)       [Request and Response Headers]
 */
router.post('/authenticate', (req, res) => {
    var result: ResponseMessage = {};
    console.log(req.body);

    /*
      The actual idea here would be to look into the DB and generate a token
      with userinformation. In case more information is needed, feel free to
      modify JWTTokenValues.

      Note that the client should ALWAYS send the token in the body of the
      request under the name 'jwt_token'

      Use POSTMAN or any browser to test it.
      If using POSTMAN, change body type to x-www-form-urlencoded
    */

    teacherDB.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        },
        include: [{
            model: db.Person,
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

/**
 * GET: htt://localhost:3000/api/students
 * @param  {[string]} '/api/students'  [Route]
 * @param  {[callback]} (req,res) [Request and Response Headers]
 */
router.post('/students', (req, res) => {
    var result: ResponseMessage = {};

    studentDB.findAll({
        attributes: ['id', 'username'],
        include: [{
            model: db.Person,
            as: 'person'
        }]
    })
        .then((users) => {
            result.status = QueryStatus.SUCCESS;
            result.message = 'Successful query.';
            result.data = users;

            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            result.status = QueryStatus.ERROR;
            result.message = 'There was an error querying all the users.';
            result.data = err;
            res.json(result);
        });
});

export default router;
