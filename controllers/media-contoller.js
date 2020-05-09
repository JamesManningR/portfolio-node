const Media = require('../models/media'),
      HttpError = require('../models/http-error');

// Create
const createMedia = async (req, res, next) => {
  const createdMedia = new Media({
    src: req.file.path,
    alt: null
  })
  const result = await createdMedia.save()
  res.json(result)
}

// Read
const getAllMedia = async (req, res, next) =>{
  let media
  try{
    media = await Media.findById().exec()
  } catch(err){
    console.log("Error getting media: ", err)
    const error = new HttpError(
      'We were unable to gather media.', 500
    );
    return next(error)
  }
  if (!media){
    throw new HttpError('No media found', 404)
  }
  res.json(media)
}

// Single 
const getMediaById = async (req, res, next) =>{
  const mediaId = req.params.id
  let media
  try{
    media = await media.findById(mediaId).exec()
  } catch (err) {
    // If there was an error
    console.log("Error getting media: ", err)
    const error = new HttpError(
      'We were unable to find this media.', 500
    );
    return next(error)
  }
  // If there was no media found
  if (!media){
    throw new HttpError(`Could not find media with Id ${mediaId}`, 404)
  }
  res.json(media)
}


module.exports = {
  createMedia,
  getAllMedia,
  getMediaById
}