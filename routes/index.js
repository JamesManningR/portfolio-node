const express = require('express'),
      router = express.Router()

const apiRoute = require("./api")

router.use("/api", apiRoute)

module.exports = router
