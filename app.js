const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('combined'));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false, type: 'application/x-www-form-urlencoded' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'customns' }));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));


app.set('views', './src/views');
app.set('view engine', 'ejs');

const profileRouter = require('./src/routes/profileRoutes');
const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')();
const userRouter = require('./src/routes/userRoutes')();

app.use('/profile', profileRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
  // let { menuInd, catInd } = req.query;
  // if (typeof (menuInd) === 'undefined') menuInd = 0;
  // if (typeof (catInd) === 'undefined') catInd = 0;

  // debug(`${menuInd} --- ${catInd}`);
  // res.send('feed incoming!');
  if (req.user) {
    res.redirect('/user/feed');
  } else {
    res.render(
      'index',
      {
        // menuItems,
        // menuIndex: menuInd,
        // categoryIndex: catInd
      }
    );
  }
});

app.listen(port, () => {
  debug(`oh, fuck, we are listening on port ${port}`);
});
