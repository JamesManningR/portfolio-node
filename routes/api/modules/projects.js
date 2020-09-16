const project = require(`${__basedir}/controllers/projects-controller`);
const express = require("express");

const auth = require(`${__basedir}/middleware/auth-check`);
const router = express.Router();

// Create
router.post("/", auth.authAdmin, project.createProject);
// Read
router.get("/", project.getProjects);
router.get("/:id", project.getProject);
// Update
router.put("/:id", auth.authAdmin, project.updateProject);
// Delete
router.delete("/:id", auth.authAdmin, project.deleteProject);

module.exports = router;
