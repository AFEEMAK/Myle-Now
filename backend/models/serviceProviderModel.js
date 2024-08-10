const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Category = require('../models/categoryModel');
const User = require('./userModel')

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    employeeId: {type: mongoose.Schema.Types.ObjectId, ref: User, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: Category, required: true },
  
});

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

module.exports = ServiceProvider;
