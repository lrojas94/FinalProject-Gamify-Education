
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import { constants, JWTTokenValues } from './../constants';
import { Teacher } from './../models/db';

const jwtStrategy = passportJwt.Strategy;
const jwtPassportOpts: passportJwt.StrategyOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromBodyField(constants.JWT_BODY_PARAM),
    secretOrKey: constants.JWT_SECRET,
};

passport.use(new jwtStrategy(jwtPassportOpts, (jwt: JWTTokenValues, done) => {
    console.log(jwt);

    Teacher.findOne({
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


export default passport;
