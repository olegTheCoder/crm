const express = require('express');

const app = express();
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();

const session = require('express-session');
const FileStore = require('session-file-store')(session);


const indexRouter = require('./src/routes/indexRouter');
const users = require('./src/routes/users');
const clients = require('./src/routes/clients');
const admin = require('./src/routes/admin');
// const orderRouter = require('./src/routes/orderRouter');

const PORT = process.env.PORT ?? 3000;

const sessionConfig = {
  store: new FileStore(),
  key: 'elbrusid',
  secret: process.env.SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: {
    path: '/',
    httpOnly: true,
    expires: 24 * 60 * 60e3,
  },
};

const sessionParser = session(sessionConfig);
app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));
hbs.registerHelper('if_noeq', function (a, b, opts) {
  if (a !== b) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

// Hepler для скрытия кнопок изменения/удаления у разных пользователей
hbs.registerHelper('if_noeq', function(a, b, opts) {
  if (a !== b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});
// -------------------------------------------------------------------

app.use(sessionParser);
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.userLogin = req.session.userLogin;
    res.locals.userAdmin = req.session.userAdmin;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', users);
app.use('/clients', clients);
app.use('/admin', admin);
// app.use('/order', orderRouter);

app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

app.use((err, req, res, next) => {
  const appMode = req.app.get('env');
  let error;

  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  res.locals.message = err.message;
  res.locals.error = error;
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT: ${PORT}`);
});
