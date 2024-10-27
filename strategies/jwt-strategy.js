import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new JwtStrategy(options, (jwt_payload, done) => {
  return jwt_payload ? done(null, jwt_payload) : done(null, false);
});
