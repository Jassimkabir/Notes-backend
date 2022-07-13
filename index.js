const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 5000;

app.use(express.json());
app.use(morgan('tiny'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
