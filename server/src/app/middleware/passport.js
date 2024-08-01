
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret_key = require("../configs/token");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromAuthHeaderAsBearerToken(),
  ExtractJwt.fromUrlQueryParameter('auth_token')
]);
opts.secretOrKey = secret_key.secret_key;
opts.iss = secret_key.iss;

module.exports =  passport => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = jwt_payload;
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};
