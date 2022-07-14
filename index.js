const express = require('express');
const app = express();
const morgan = require('morgan');
const sequelize = require('./models/index');
require('dotenv').config();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/notes', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
