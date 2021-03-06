// default
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var session = require('express-session');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// ----- Generate index
app.get('/', (req, res) => res.render('pages/index'))
// ----- -----
// ----- Generate new route views
app.get('/preview', (req, res) => res.render('pages/preview'))
// -----
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// config express-session
var sess = {
  secret: 'Ys_qt5-pPMxMQIHxGQbk84XZvCjpuEayfJOo9LOhamV9Ak9hOx4nrDYLbd4_PtNj',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

app.use(session(sess))