// Used for easy access to root dir (makes modules a lot easier to refactor)
// 0 - Utilities
global.__basedir = __dirname;

// 1 - Get dependencies
const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  path = require('path')

// 2 - Create App
const app = express()
const PORT = process.env.PORT

// 3 - App Options
// -- Parse body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// -- Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next()
})

// -- Public folder static hosting
app.use(express.static(path.join(__dirname, '/public')))
// -- Uploads folder static hosting
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// 4 - Routes 
// -- Route File
const routes = require("./routes")
app.use(routes)

// -- Fallback Route
app.use((err, req, res, next) => {
  // Any request to this server will get here, and will send an HTTP
  res.status(err.code || 500).json({
    message: err.message || 'Something went wrong',
    code: err.code || 500
  })
  return next()
});

// 5 - Mongoose/MongoDb options
mongoose.set('useFindAndModify', false)

// 6 - Init
// -- db connection and server
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
