const apiRouter = require("./api");
const passport = require("passport");
const checkPassport = require("../app/middleware/passport")(passport);

function route(app) {
  app.use(passport.initialize());
  checkPassport;
  app.use("/api", apiRouter);
}

module.exports = route;
