// default

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// auth0

var session = require('express-session');

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

app.use(session(sess));