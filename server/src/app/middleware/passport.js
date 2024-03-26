
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret_key = require("../configs/token");
const pool = require("../models/pool");

const sql = "select id, Authorization from account where id = ? and Phone = ?";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret_key.secret_key;
opts.iss = "Doccoming";

module.exports =  passport => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        pool.query(
          sql,
          [jwt_payload.id, jwt_payload.Phone],
          function (error, user, fields) {
            if (error)
              throw error;
            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }
          }
        );
      } catch (error) {
        done(error, false);
      }
    })
  );
};
