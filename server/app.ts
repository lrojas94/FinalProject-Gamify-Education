/// <reference path="../typings/index.d.ts"/>
import * as express from 'express';
import * as jwt from 'express-jwt';
import * as serveStatic from'serve-static';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as db from './models/db';
import * as cors from 'cors';
import {constants} from './constants';

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('client/'));
app.use(express.static('bower_components/'));
app.use(serveStatic(path.join(__dirname, 'client/'), {'index': ['index.html']}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

/**
 * Authentication middleware provided by express-jwt.
 * This middleware will check incoming requests for a valid
 * JWT on any routes that it is applied to.
 */
const authCheck = jwt({
    secret: new Buffer(constants.API_BACKEND_CLIENT_SECRET, 'base64'),
    audience: constants.API_BACKEND_CLIENT_ID
});

app.get('/api', function(req, res){
  console.log(req.query); // This is for a GET
  res.send({'data' : 'Working'});
});

app.post('/api', function(req, res){
  console.log(req.body); // This is for a Post
  res.send({'data' : 'Working'});
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + './../client/index.html'));
});


app.listen(port, function () {
  console.log(`Application running on port: ${port}`);

  db.initialize();
  db.User.sync({force: true}).then(function(){
    db.User.create({
      firstName: 'Luis',
      lastName: 'Rojas'
    });
  });

});
