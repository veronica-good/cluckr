const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const knex = require('./db/client')

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // setting configuration for express letting it know to use EJS as our templating engine

app.use(express.urlencoded({ extended: true }));

// Method Override
app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method;
    return method;
  }
}))

app.use(cookieParser()); // will parse cookies and put them on request.cookies
// app.use is a method used to mount middleware
app.use(logger('dev')); // add logging middleware

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
  const username = req.cookies.username;

  res.locals.username = "";
  // properties set on res.locals become accessible in any view
  if (username) {
    res.locals.username = username
    console.log(`Signed in as ${username}`);
  }
  next();
})



app.get('/home', (request, response) => {

  const ONE_DAY = 1000 * 60 * 60 * 24;
  response.cookie('hello', 'world', { maxAge: ONE_DAY })
  response.render('home'); // express will look for a view/template at /views/welcome
})

app.get('/index', (request, response)=>{
  knex('clucks')
    .orderBy('created_at', 'desc')
    .then(clucks=>{
        response.render('clucks/index', {clucks: clucks});
    })
})


app.post('/sign_in', (req, res) => {
  // req.body holds all the info from the post request
  const COOKIE_EXPIRE = 1000 * 60 * 60 * 24 * 7;
  const username = req.body.username;
  res.cookie('username', username, { maxAge: COOKIE_EXPIRE });
  res.redirect('/clucks/new');
});

app.post('/log_out', (req, res) => {
  res.clearCookie('username');
  res.redirect('/home');
});

// ------------
// POST ROUTES
// ------------
const cluckRouter = require('./routes/clucks');
const { request, response } = require('express');
app.use('/clucks', cluckRouter);

const ADDRESS = 'localhost'; // the loopback address this is your home for your machine. The IP is 127.0.0.1
const PORT = 3500;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});