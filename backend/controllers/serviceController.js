const SubCategories = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');
const Service = require('../models/serviceModel');
const ServiceDetails = require('../models/serviceDetailModel');
const mongoose = require('mongoose');

const getSubCategories = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such category'});
  }

  const subcategories = await SubCategories.find({ category_id: id });

  if (!subcategories.length) {
    return res.status(404).json({error: 'No subcategories found for this category'});
  }
  
  res.status(200).json(subcategories);
};



// In your categories controller
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
const getServices = async (req, res) => {
  try {
    const categories = await Service.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};


const getServicesById = async (req, res) => {

  const { id } = req.params;
    console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such category'});
  }

  const service = await Service.find({ category: id });

  if (!service.length) {
    return res.status(404).json({error: 'No service found for this category'});
  }
  console.log(service)
  res.status(200).json(service);


};





const getServicesByCategoryAndSubcategory = async (req, res) => {
  const { categoryId, subcategoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId) || !mongoose.Types.ObjectId.isValid(subcategoryId)) {
    return res.status(404).json({ error: 'Invalid category or subcategory ID' });
  }

  try {
    const services = await Service.find({ category: categoryId, subcategory: subcategoryId });
    if (services.length === 0) {
      return res.status(404).json({ error: 'No services found for this category and subcategory' });
    }
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};






// create new service
const createService = async (req, res) => {
  const { name, description, category, subcategory, image, price, time } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!category) {
    emptyFields.push('category');
  }
  if (!subcategory) {
    emptyFields.push('subcategory');
  }
  if (!price) {
    emptyFields.push('price');
  }
  if (!time) {
    emptyFields.push('time');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add doc to db
  try {
    const service = await Service.create({ name, description, category, subcategory, image, price, time });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const createServiceDetails = async (req, res) => {
  const { service_id, image, long_description, process_steps } = req.body;

  let emptyFields = [];

  if (!service_id) emptyFields.push('service_id');
  if (!image) emptyFields.push('image');
  if (!long_description) emptyFields.push('long_description');
  if (!process_steps || !process_steps.length) emptyFields.push('process_steps');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const serviceDetails = await ServiceDetails.create({ service_id, image, long_description, process_steps });
    res.status(200).json(serviceDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const getServiceDetailsByServiceId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid service ID' });
  }

  try {
    const serviceDetails = await ServiceDetails.findOne({ service_id: id }).populate('service_id');
    if (!serviceDetails) {
      return res.status(404).json({ error: 'Service details not found' });
    }

    res.status(200).json(serviceDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {getServiceDetailsByServiceId , getCategories, getSubCategories, getServices,createService,getServicesById, createServiceDetails, getServicesByCategoryAndSubcategory};