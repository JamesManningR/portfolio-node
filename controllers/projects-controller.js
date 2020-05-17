const Project = require('../models/project'),
      HttpError = require('../models/http-error')

// Create
const createProject = async (req, res, next) => {
  const createdProject = new Project({
    title,
    body,
    color,
    featuredImage,
    images,
    skills
  } = req.body)
  const result = await createdProject.save()
  res.json(result)
}

// READ
// All projects
const getProjects = async (req, res, next) =>{
  let projects
  try{
    projects = await Project.find()
      .populate('featuredImage')
      .populate('images')
      .exec()
  } catch(err){
    console.log("Error getting projects: ", err)
    const error = new HttpError(
      'We were unable to gather projects.', 500
    )
    return next(error)
  }
  if (!projects){
    const error = new HttpError(`No projects Found`, 404)
    return next(error)
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
    const error = new HttpError(
      'We were unable to find this project.', 500
    )
    return next(error)
  }
  // If there was no project found
  if (!project){
    const error = new HttpError(`Could not find project with Id ${projectId}`, 404)
    return next(error)
  }
  res.json(project)
}

const updateProject = async (req, res, next) => {
  const updateProject = new Project({
    title,
    body,
    color,
    featuredImage,
    images,
    skills
  } = req.body)
  try{
    result = await Project.findOneAndUpdate(req.params.id, updateProject)
  } catch(err) {
    const error = new HttpError(
      'We were unable to update this project.', 500
    )
    return next(error)
  }
  res.json(result)
}

const deleteProject = async (req, res, next) => {
  const projectId = req.params.id
  try{
    const result = await Project.findByIdAndDelete(projectId)
  } catch (err) {
    const error = new HttpError(
      'We were unable to delete this project', 500
    )
    return next(error);
  }
  if (!result){
    const error = new HttpError(
      'Could not find project with ID', 404
    )
    return next(error);
  }
  res.json(result)
}

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
}