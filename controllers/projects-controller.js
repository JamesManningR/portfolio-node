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
  let projects
  try{
    projects = await Project.find().exec()
  } catch(err){
    console.log("Error getting projects: ", err);
    const error = new HttpError(
      'We were unable to gather projects.', 500
    );
    return next(error)
  }
  if (!projects){
    throw new HttpError('No projects found', 404);
  }
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
    console.log("Error getting project: ", err);
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