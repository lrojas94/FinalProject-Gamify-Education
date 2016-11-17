
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import { constants, JWTTokenValues } from './../constants';
import { Teacher, Student, Person } from './../models/db';
import * as _ from 'lodash';

const jwtStrategy = passportJwt.Strategy;
const jwtPassportOpts: passportJwt.StrategyOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: constants.JWT_SECRET,
    passReqToCallback: true
};

passport.use(new jwtStrategy(jwtPassportOpts, (req, jwt: JWTTokenValues, done) => {
    switch (jwt.type) {
      case 'STUDENT':
        Student.findOne({
          where: {
            username: jwt.username
          },
          include: [{
              model: Person,
              as: 'person'
          }]
        })
        .then((student) => {
          req.userType = 'STUDENT';
          var where = {
            groupId: student['groupId']
          };

          var queryParams = ['topicId', 'topic', 'difficultyId', 'difficulty'];
          var query = _.pick(req.body || {}, queryParams);
          where = _.merge(where, query);
          req.where = where;
          done(null, student);
        })
        .catch((err) => {
          done(err, null);
        });
      break;
      case 'TEACHER':
        Teacher.findOne({
          where: {
            username: jwt.username
          },
          include: [{
              model: Person,
              as: 'person'
          }]
        })
        .then((teacher) => {
          req.userType = 'TEACHER';
          done(null, teacher);
        })
        .catch((err) => {
          done(err, null);
        });
      break;
    }

}));


export default passport;
