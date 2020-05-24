const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  path = require('path')

const app = express()

const PORT = process.env.PORT

// parse body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next()
})

// Make public folder statically hosted
app.use(express.static(path.join(__dirname, '/public')))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Route files
const projectsRoute = require("./routes/projects"),
      mediaRoute = require("./routes/media"),
      authRoute = require("./routes/auth")

// Routes
app.use("/", authRoute)
app.use("/projects", projectsRoute)
app.use("/media", mediaRoute)

app.use(function(error, req, res, next) {
  // Any request to this server will get here, and will send an HTTP
  res.status(error.code)
  res.json({ error });
});

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

mongoose.set('useFindAndModify', false);

// Init db connection and server
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start server
    console.log("Connection to database successful");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(`Connection failed: ${err}`)
  })
