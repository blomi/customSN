const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'customns';
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to the server');
          const db = client.db(dbName);
          const col = db.collection('users');

          const user = await col.findOne({ username });
          debug(user);
          if (user === null || user.password !== password) {
            done(null, false);
          } else {
            done(null, user);
          }
        } catch (err) {
          debug(err);
        }
        client.close();
      }());
      // username += 'olaa';
      // const tmp = `${username}olaa`;
      // const user = {
      //   username, password
      // };
      // done(null, user);
    }
  ));
}

module.exports = localStrategy;
