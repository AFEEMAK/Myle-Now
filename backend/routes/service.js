const express = require('express');
const { getSubCategories, createService,getServices, getServicesById } = require('../controllers/serviceController');
const { getCategories } = require('../controllers/serviceController');


const router = express.Router();

// GET subcategories by category ID
router.get('/subcategories/:id', getSubCategories);
router.get('/categories', getCategories);
router.get('/',getServices)
router.get('/category/:id',getServicesById)



router.post('/', createService )

module.exports = router;
