const Project = require('../models/project');
const HttpError = require('../models/http-error');

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
  let project
  try{
    project = await Project.findById(projectId)
      .populate("images")
      .populate("featuredImage")
      .exec()
  } catch (err) {
    // If there was an error
    const error = new HttpError(
      'We were unable to find this project.', 500
    );
    return next(error)
  }
  // If there was no project found
  if (!project){
    throw new HttpError(`Could not find project with Id ${projectId}`, 404);
  }

  res.json(project)
}

module.exports = {
  createProject,
  getProjects,
  getProject
}