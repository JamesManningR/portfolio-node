const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');


// Routes
const projectsRoute = require("./routes/projects");
      
const app = express();

const PORT = process.env.PORT;

// parse body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/projects", projectsRoute);

// Init db
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection to database successful')
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(`Connection failed: ${err}`)
});
