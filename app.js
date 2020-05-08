const express = require('express'),
      bodyParser = require('body-parser'),
      db = require('./mongoose');

const app = express();

const PORT = process.env.PORT;

// parse body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/projects', db.createProject);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));