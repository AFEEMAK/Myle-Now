const mongoose = require('mongoose');

const processStepSchema = new mongoose.Schema({
  stepHeader: {
    type: String,
    required: true
  },
  stepDetail: {
    type: String,
    required: true
  }
});

const serviceDetailsSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  long_description: {
    type: String,
    required: true
  },
  process_steps: [processStepSchema]
});

module.exports = mongoose.model('ServiceDetails', serviceDetailsSchema);
