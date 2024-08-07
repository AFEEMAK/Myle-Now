const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  },
  category_image: {
    type: String,
    required: true
  },
  category_desc: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Categories', CategorySchema)