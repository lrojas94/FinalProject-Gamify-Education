/// <reference path="../typings/index.d.ts"/>
/// <reference path="./tests/tests.ts"/>
import * as express from 'express';
import * as serveStatic from'serve-static';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import * as db from './models/db';
import apiRouter from './controllers/apiRouter';
import {constants} from './constants';
import {JWTTokenValues} from './constants';

db.initialize();
var teacherDB = db.Teacher;
teacherDB.sync();

var app = express();

app.use(express.static('client/'));
app.use(express.static('bower_components/'));
app.use(serveStatic(path.join(__dirname, 'client/'), { 'index': ['index.html'] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var jwtStrategy = passportJwt.Strategy;
var jwtPassportOpts: passportJwt.StrategyOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromBodyField(constants.JWT_BODY_PARAM),
    secretOrKey: constants.JWT_SECRET,
};

passport.use(new jwtStrategy(jwtPassportOpts, (jwt: JWTTokenValues, done) => {
    console.log(jwt);

    teacherDB.findOne({
        where: {
            username: jwt.username
        }
    })
        .then((teacher) => {
            done(null, teacher);
        })
        .catch((err) => {
            done(err, null);
        });

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + './../client/index.html'));
});

app.listen(port, function() {
    console.log(`Application running on port: ${port}`);
});
