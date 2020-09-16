const express = require("express");

const router = express.Router();

const projectsRoute = require("./modules/projects");
const mediaRoute = require("./modules/media");
const blogRoute = require("./modules/auth");
const authRoute = require("./modules/auth");

router.use("/auth", authRoute);
router.use("/projects", projectsRoute);
router.use("/blog-posts", blogRoute);
router.use("/media", mediaRoute);

module.exports = router;
