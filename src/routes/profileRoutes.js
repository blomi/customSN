const express = require('express');
const profileRouter = express.Router();
const debug = require('debug');

/*

const menuItems = [
  {
    name: 'About',
    categories: [
      {
        categoryName: 'Overview'
      },
      {
        categoryName: 'Locations'
      },
      {
        categoryName: 'Study / Work'
      },
      {
        categoryName: 'Contact'
      },
      {
        categoryName: 'Family'
      }
    ]
  },
  {
    name: 'Friends',
    categories: [
      {
        categoryName: 'All'
      },
      {
        categoryName: 'Recently Added'
      },
      {
        categoryName: 'Most Active'
      },
      {
        categoryName: 'Family'
      }
    ]
  },
  {
    name: 'Interests',
    categories: [
      {
        categoryName: 'Music'
      },
      {
        categoryName: 'Movies'
      },
      {
        categoryName: 'Science'
      },
      {
        categoryName: 'Business'
      },
      {
        categoryName: 'Education'
      },
      {
        categoryName: 'Food'
      },
      {
        categoryName: 'Books'
      },
      {
        categoryName: 'Gaming'
      },
      {
        categoryName: 'Sports'
      },
      {
        categoryName: 'Design'
      },
      {
        categoryName: 'Etc'
      }
    ]
  },
  {
    name: 'Photos',
    categories: [
      {
        categoryName: 'Albums'
      },
      {
        categoryName: 'Mobile Uploads'
      },
      {
        categoryName: 'Recently Added'
      },
      {
        categoryName: 'Sorted'
      }
    ]
  }
];

*/
profileRouter.route('/').get((req, res) => {
  res.send('This is profile/about page');
});

profileRouter.route('/about').get((req, res) => {
  res.send('This is profile/about page');
});

profileRouter.route('/friends').get((req, res) => {
  res.send('This is profile/friends page');
});

profileRouter.route('/interests').get((req, res) => {
  debug(req.params);
  debug(req.query);
  res.send(`${req}This is profile/interests page`);
});

profileRouter.route('/photos').get((req, res) => {
  res.send('This is profile/photos page');
});

module.exports = profileRouter;
