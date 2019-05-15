const passport = require('passport');
// const debug = require('debug')('app:passport');
require('./strategies/local.strategy')();

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // STORES THE USER INTO SESSION. pass to done, whatever we need to store about user in the session
  passport.serializeUser((user, done) => {
    // debug(`serialize::${user}`);
    done(null, user);
  });

  // now whatever we passed into session, it returns it back, and we need to recreate user with that
  passport.deserializeUser((user, done) => {
    // debug(`DEserialize::${user}`);
    done(null, user);
  });

  return passport;
}

module.exports = passportConfig;
