import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import fetchUser from "../services/findUser.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await fetchUser({ _id: jwtPayload.userId });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
