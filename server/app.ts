/// <reference path="../typings/index.d.ts"/>
/// <reference path="./tests/tests.ts"/>
import * as express from 'express';
import * as serveStatic from'serve-static';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import * as db from './models/db';
import * as jwt from 'jsonwebtoken';
import {constants} from './constants';

interface JWTTokenValues {
  id: Number;
  username: String;
}

const jwtBodyParam = 'jwt_token';

var app = express();

app.use(express.static('client/'));
app.use(express.static('bower_components/'));
app.use(serveStatic(path.join(__dirname, 'client/'), {'index': ['index.html']}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var jwtStrategy = passportJwt.Strategy;
var jwtPassportOpts: passportJwt.StrategyOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromBodyField(jwtBodyParam),
  secretOrKey: constants.JWT_SECRET,
};

passport.use(new jwtStrategy(jwtPassportOpts, (jwt: JWTTokenValues, done) => {
  /*
    Now, based on the token data
    We can get the data of the user from the Database to pass it along in the request.
    Done function takes two parameters: (error,user).

    More can be read in the PASSPORT api.
  */
  console.log(jwt);
  done(null, 'good');
}));

app.use(passport.initialize());
app.use(passport.session());

/*
The following route requires you to have a valid JWT token.
*/
app.post('/api/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    success : 'You finally have access to your request!'
  });
});

app.post('/api/login', (req, res) => {
  /*
    The actual idea here would be to look into the DB and generate a token
    with userinformation. In case more information is needed, feel free to
    modify JWTTokenValues.

    Note that the client should ALWAYS send the token in the body of the
    request under the name 'jwt_token'
  */
  var tokenValues: JWTTokenValues = {
    id: 0,
    username: req.body.username || 'lrojas'
  };

  console.log(req.body);

  /*
    Token generated for the tokenValues above:
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwidXNlcm5hbWUiOiJscm9qYXMiLCJpYXQiOjE0NjYyOTkzNTR9.P7hEmzQ-RtPX9sR5Pl9hVS5oPe85a_uAfTw9fua1h6A

    Use POSTMAN or any browser to test it.
    If using POSTMAN, change body type to x-www-form-urlencoded
  */

  var token = jwt.sign(tokenValues, constants.JWT_SECRET);
  var json = {};
  json[jwtBodyParam] = token;
  res.json(json);
});

app.get('/api', function(req, res){
  console.log(req.query); // This is for a GET
  res.json({'data' : 'Working'});
});

app.post('/api', function(req, res){
  console.log(req.body); // This is for a Post
  res.json({'data' : 'Working'});
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + './../client/index.html'));
});




app.listen(port, function () {
  console.log(`Application running on port: ${port}`);
});
