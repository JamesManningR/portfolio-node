const Media = require('../models/media');

// Create
const createMedia = async (req, res, next) =>{
  console.log(req.body)
  const createdMedia = new Media({
    src: req.body.url,
    alt: req.body.alt
  })
}

module.exports = {
  createMedia
}