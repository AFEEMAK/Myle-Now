const SubCategories = require('../models/subCategoryModel');
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

module.exports = {
  getSubCategories
};
