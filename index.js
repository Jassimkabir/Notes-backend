const express = require('express');
const app = express();
const morgan = require('morgan');
const sequelize = require('./models/index');
require('dotenv').config();

sequelize
  .authenticate()
  .then(() => console.log('Connected to databse.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

app.use(express.json());
app.use(morgan('tiny'));

app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
