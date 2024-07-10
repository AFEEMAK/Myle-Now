const express = require('express');
const { getSubCategories } = require('../controllers/serviceController');

const router = express.Router();

// GET subcategories by category ID
router.get('/subcategories/:id', getSubCategories);

module.exports = router;
