
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import { constants, JWTTokenValues } from './../constants';
import { Teacher, Student, Person } from './../models/db';

const jwtStrategy = passportJwt.Strategy;
const jwtPassportOpts: passportJwt.StrategyOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: constants.JWT_SECRET,
};

passport.use(new jwtStrategy(jwtPassportOpts, (jwt: JWTTokenValues, done) => {
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
          done(null, teacher);
        })
        .catch((err) => {
          done(err, null);
        });
      break;
    }

}));


export default passport;
