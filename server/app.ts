/// <reference path="../typings/index.d.ts"/>
/// <reference path="./tests/tests.ts"/>
import * as express from 'express';
import * as serveStatic from'serve-static';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';
import * as db from './models/db';
import passport from './utility/passport';
import apiRouter from './controllers/api';
import {constants, JWTTokenValues} from './constants';

var app = express();
const port = process.env.PORT || 3000;

app.use(express.static('client/'));
app.use(express.static('bower_components/'));
app.use(serveStatic(path.join(__dirname, 'client/'), { 'index': ['index.html'] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + './../client/index.html'));
});

app.listen(port, function() {
    console.log(`Application running on port: ${port}`);
    db.syncAll();
});
