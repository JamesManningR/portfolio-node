const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  featuredImage: { type : mongoose.Types.ObjectId, ref: 'Media' },
  images: [{ type : mongoose.Types.ObjectId, ref: 'Media' }],
  skills: { type: Array },
  links: {type: Array},
  featured: {type: Boolean, default: false}
})

module.exports = mongoose.model('Project', projectSchema)