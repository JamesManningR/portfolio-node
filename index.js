const express = require('express'),
      bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  res.send('<h1>Hi, I\'m a response</h1>');
  next();
});

// Run the server on port 5000
app.listen(5000);