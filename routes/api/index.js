const express = require('express'),
      router = express.Router()

const projectsRoute = require("./modules/projects"),
      mediaRoute = require("./modules/media"),
      blogRoute = require("./modules/auth"),
      authRoute = require("./modules/auth")

router.use("/auth", authRoute)
router.use("/projects", projectsRoute)
router.use("/blog-posts", blogRoute)
router.use("/media", mediaRoute)

module.exports = router
