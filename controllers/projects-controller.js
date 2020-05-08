const Project = require('../models/project');

// Create
const createProject = async (req, res, next) => {
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
  const projectId = req.params.id
  const project = await Project.findById(projectId).exec()
  res.json(project)
}

module.exports = {
  createProject,
  getProjects,
  getProject
}