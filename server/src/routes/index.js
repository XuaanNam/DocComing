const apiRouter = require("./api");
const passport = require("passport");
const checkPassport = require("../app/middleware/passport")(passport);
require("../app/configs/google-passport");

function route(app) {
  app.use(passport.initialize());
  checkPassport;  
  app.use(passport.session());
  app.use("/api", apiRouter);
}

module.exports = route;
