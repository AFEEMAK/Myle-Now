const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    employeeId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  
});

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

module.exports = ServiceProvider;
