const express = require('express');
const debug = require('debug')('app:userRoutes');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const userRouter = express.Router();

const menuItems = [
  {
    name: 'About',
    subMenuItems: [
      {
        name: 'Overview',
        url: '/user/profile/overview'
      },
      {
        name: 'Locations',
        url: '/user/profile/locations'
      },
      {
        name: 'Study / Work',
        url: '/user/profile/study'
      }
    ]
  },
  {
    name: 'Friends',
    subMenuItems: [
      {
        name: 'All',
        url: '/user/profile/all'
      },
      {
        name: 'Recently added',
        url: '/user/profile/recent'
      },
      {
        name: 'Family',
        url: '/user/profile/family'
      }
    ]
  },
  {
    name: 'Interests',
    subMenuItems: [
      {
        name: 'Music',
        url: '/user/profile/music'
      },
      {
        name: 'Movies',
        url: '/user/profile/movies'
      },
      {
        name: 'Science',
        url: '/user/profile/science'
      }
    ]
  },
  {
    name: 'Photos',
    subMenuItems: [
      {
        name: 'Albums',
        url: '/user/profile/albums'
      },
      {
        name: 'Mobile Uploads',
        url: '/user/profile/mobile'
      },
      {
        name: 'Recently Added',
        url: '/user/profile/recentadded'
      }
    ]
  }
];

const users = [
  {
    username: 'cheswick',
    pasword: 'asd',
    id: '5ccaad7449191b14c68e613c',
    firstname: 'beka',
    lastname: 'lomitashvili',
    age: '25',
    birthdate: '1994 03 24',
    address: 'Peaky Street 52, Birmingham, England',
    phonenumber: '+943533636363',
    about: "Don't know, don't care",
    friends: [
      '5ccaad7449191b14c68e613d',
      '5ccaad7449191b14c68e613e',
      '5ccaad7449191b14c68e613f',
      '5ccaad7449191b14c68e613g'
    ],
    interests: [
      'Music',
      'Movies',
      'Science',
      'Cooking',
      'Algorithms'
    ],
    locations: [
      {
        address: 'chavchavadze ave. 2/2',
        from: '1994-03-24',
        to: '2001-05-12'
      },
      {
        address: 'kekelidze str. 2',
        from: '2001-05-13',
        to: '2019-15-05'
      }
    ]
  }
];

// const users = [
//   {
//     username: 'cheswick',
//     firstname: 'beka',
//     lastname: 'lomitashvili',
//     birthdate: '1994 03 24',
//     age: '25',
//     adress: 'chavchavadze ave. 2/2',
//     phonenumber: '+9955555499583',
//     about: "I'm Hungry",

//   }
// ]

const posts = [
  {
    author: {
      firstname: 'beka',
      lastname: 'lomitashvili',
      thumburl: '/img/beka_lomitashvili.jpg'
    },
    date: '2019-05-10',
    description: 'traffic in birmingham was freakin unbelievable',
    imgurl: '/img/traffic.jpg',
    imgdescription: 'some image, huh? :)',
    comments: [
      {
        author: {
          firstname: 'bill',
          lastname: 'burr',
          thumburl: '/img/bill_burr.jpg'
        },
        date: '2019-05-10',
        description: 'hear hear',
        subcomments: [
          {
            author: {
              firstname: 'beka',
              lastname: 'lomitashvili',
              thumburl: '/img/beka_lomitashvili.jpg'
            },
            date: '2019-05-10',
            description: 'horrific.'
          },
          {
            author: {
              firstname: 'bill',
              lastname: 'burr',
              thumburl: '/img/bill_burr.jpg'
            },
            date: '2019-05-10',
            description: 'yo how u doin? :) '
          }
        ]
      },
      {
        author: {
          firstname: 'jordan',
          lastname: 'peterson',
          thumburl: '/img/profile-pic2.jpg'
        },
        date: '2019-05-10',
        description: 'awful',
        subcomments: []
      }
    ]
  },
  {
    author: {
      firstname: 'beka',
      lastname: 'lomitashvili',
      thumburl: '/img/beka_lomitashvili.jpg'
    },
    date: '2019-05-10',
    description: 'traffic in birmingham was freakin unbelievable',
    imgurl: '/img/traffic.jpg',
    imgdescription: 'some image, huh? :)',
    comments: [
      {
        author: {
          firstname: 'bill',
          lastname: 'burr',
          thumburl: '/img/bill_burr.jpg'
        },
        date: '2019-05-10',
        description: 'hear hear',
        subcomments: [
          {
            author: {
              firstname: 'beka',
              lastname: 'lomitashvili',
              thumburl: '/img/beka_lomitashvili.jpg'
            },
            date: '2019-05-10',
            description: 'horrific.'
          },
          {
            author: {
              firstname: 'bill',
              lastname: 'burr',
              thumburl: '/img/bill_burr.jpg'
            },
            date: '2019-05-10',
            description: 'yo how u doin? :) '
          }
        ]
      },
      {
        author: {
          firstname: 'jordan',
          lastname: 'peterson',
          thumburl: '/img/profile-pic2.jpg'
        },
        date: '2019-05-10',
        description: 'awful',
        subcomments: []
      }
    ]
  },
  {
    author: {
      firstname: 'beka',
      lastname: 'lomitashvili',
      thumburl: '/img/beka_lomitashvili.jpg'
    },
    date: '2019-05-10',
    description: 'traffic in birmingham was freakin unbelievable',
    imgurl: '/img/traffic.jpg',
    imgdescription: 'some image, huh? :)',
    comments: [
      {
        author: {
          firstname: 'bill',
          lastname: 'burr',
          thumburl: '/img/bill_burr.jpg'
        },
        date: '2019-05-10',
        description: 'hear hear',
        subcomments: [
          {
            author: {
              firstname: 'beka',
              lastname: 'lomitashvili',
              thumburl: '/img/beka_lomitashvili.jpg'
            },
            date: '2019-05-10',
            description: 'horrific.'
          },
          {
            author: {
              firstname: 'bill',
              lastname: 'burr',
              thumburl: '/img/bill_burr.jpg'
            },
            date: '2019-05-10',
            description: 'yo how u doin? :) '
          }
        ]
      },
      {
        author: {
          firstname: 'jordan',
          lastname: 'peterson',
          thumburl: '/img/profile-pic2.jpg'
        },
        date: '2019-05-10',
        description: 'awful',
        subcomments: []
      }
    ]
  }
];

function router() {
  userRouter.route('/*')
    .get((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    });
  userRouter.route('/feed')
    .get((req, res) => {
      res.render('feed');
    });
  userRouter.route('/posts')
    .get((req, res) => {
      res.json({ posts });
    });
  userRouter.route('/profile')
    .get((req, res) => {
      res.render('profile', { menuItems });
    });
  userRouter.route('/overview')
    .get((req, res) => {
      debug('aq vafshje modis???');
      res.render('overview');
    });
  userRouter.route('/data')
    .post((req, res) => {
      // let f = false;
      // let i = 0;
      // for (; i < users.length; i++) {
      //   debug(`${req.user._id} --- ${users[i].id}`);
      //   if (req.user._id === users[i].id) {
      //     debug('user found!');
      //     f = true;
      //     break;
      //   }
      // }
      // if (!f) {
      //   debug('could not find user..');
      //   res.render('profile', { menuItems });
      // } else {
      //   res.json(users[i]);
      // }
      res.json(users[0]);

      // res.render('overview', { users })
      // debug(req);
      // debug(req.user);
      // debug(req.user._id);
      // debug(req.body);
      // res.send('info incomming!!');
    });

  return userRouter;
}

module.exports = router;
