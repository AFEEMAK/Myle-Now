const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  subcategory: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // Storing image path or URL
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
