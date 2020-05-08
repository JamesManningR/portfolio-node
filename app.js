const express = require('express'),
      bodyParser = require('body-parser');

// Routes
const projectsRoute = require("./routes/projects");
      
const app = express();

const PORT = process.env.PORT;

// parse body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/projects", projectsRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));