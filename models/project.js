const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  featuredImage: { type : mongoose.Types.ObjectId, ref: 'Media' },
  color: { type: String },
  images: [{ type : mongoose.Types.ObjectId, ref: 'Media' }],
  skills: { type: Array }
})

module.exports = mongoose.model('Project', projectSchema)