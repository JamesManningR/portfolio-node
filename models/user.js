const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String }
})

module.exports = mongoose.model('User', mediaSchema)