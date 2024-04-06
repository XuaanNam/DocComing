
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret_key = require("../configs/token");
// const pool = require("../models/pool");

// const sql = "select id, Authorization from account where id = ?";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret_key.secret_key;
opts.iss = "Doccoming";

module.exports =  passport => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = {
          id: jwt_payload.id,
          Authorization: jwt_payload.Authorization
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};
