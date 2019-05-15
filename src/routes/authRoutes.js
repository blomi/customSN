const express = require('express');
const debug = require('debug')('app:authRoutes');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();


function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      debug(req.user);
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'customns';
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to the server');
          const db = client.db(dbName);
          const col = db.collection('users');
          const user = { username, password };
          const result = await col.insertOne(user);
          debug(result);
          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
      // create user
      // log in user
      // res.json(req.body);
    });
  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('index');
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.redirect('/user/feed');
    });
  return authRouter;
}

module.exports = router;
