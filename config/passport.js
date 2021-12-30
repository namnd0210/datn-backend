import dotenv from 'dotenv';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import User from '../models/User';

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrKey,
};

export default function usePassport(passport) {
  passport.use(
    new JWTStrategy(jwtOptions, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    }),
  );
}
