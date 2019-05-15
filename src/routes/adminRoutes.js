const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const users = [
  {
    username: 'anna.thompson',
    password: '1234',
    firstname: 'Anna',
    lastname: 'Thompson',
    email: 'annathompson@gmail.com',
    age: 21
  },
  {
    username: 'jordan.peterson',
    password: '1212',
    firstname: 'Jordan',
    lastname: 'Peterson',
    email: 'jordanpeterson@gmail.com',
    age: 67
  }
];


function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'customns';
      debug(`aq vafshe modis?${MongoClient}`);
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to the mongodb!');
          const db = client.db(dbName);

          const response = await db.collection('users').insertMany(users);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
