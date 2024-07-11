const SubCategories = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');
const Service = require('../models/serviceModel');
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






module.exports = { getCategories, getSubCategories, getServices,createService,getServicesById };