const mongoose = require('mongoose');

const Project = require('../models/project')

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connection to database successful')
}).catch((err) => {
  console.log(`Connection failed: ${err}`)
});

// ============= Projects
// Create
const createProject = async (req, res, next) => {
  console.log(req.body)
  const createdProject = new Project({
    title: req.body.title,
    body: req.body.body,
    featuredImage: req.body.featuredImage,
    images: req.body.images,
    skills: req.body.skills
  });
  const result = await createdProject.save()
  res.json(result)
}

// READ
// All projects
const getProjects = async (req, res, next) =>{
  const projects = await Project.find().exec()
  res.json(projects)
}
// Single project
const getProject = async (req, res, next) =>{
  const projectId = req.body.projectId
  const project = await Project.findById(projectId).exec()
  res.json(projects)
}

// ============= Media
const createMedia = async (req, res, next) =>{
  console.log(req.body)
  const createdMedia = new Media({
    src: req.body.url,
    alt: req.body.alt
  })
}

module.exports = {
  createProject,
  getProjects,
  getProject,
  createMedia
}