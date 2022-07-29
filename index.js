const express = require('express');
const app = express();
const morgan = require('morgan');
const sequelize = require('./models/index');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const passportSetup = require('./lib/passport');
require('dotenv').config();

sequelize
  .authenticate()
  .then(() => console.log('Connected to databse.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

app.use(express.json());
app.use(morgan('tiny'));
app.use(
  cookieSession({
    name: 'session',
    keys: ['jassim'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.REACT_APP_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
