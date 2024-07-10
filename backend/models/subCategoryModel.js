const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubCategorySchema = new Schema({
    category_id: {
    type: String,
    required: true
    },
    subcategory_name: {
    type: String,
    required: true
  },
  subcategory_image: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('SubCategories', SubCategorySchema)