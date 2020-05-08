const mongoose = require('mongoose');

const Project = require('./models/project')

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connection to database successful')
}).catch((err) => {
  console.log(`Connection failed: ${err}`)
});

const createProject = async (req, res, next) => {
  console.log(req.body)
  const createdProject = new Project({
    title: req.body.title,
    body: req.body.body,
    featuredImage: req.body.featuredImage,
    images: req.body.images,
    skills: req.body.skills
  });
  const result = await createdProject.save();
  res.json(result);
  return
}

const createMedia = async (req, res, next) =>{
  console.log(req.body)
  const createdMedia = new Media({
    src: req.body.url,
    alt: req.body.alt
  })
}

exports.createProject = createProject;