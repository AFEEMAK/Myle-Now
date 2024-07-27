const express = require('express');
const { getSubCategories, createService,getServices, getServicesById,getServicesByCategoryAndSubcategory,createServiceDetails } = require('../controllers/serviceController');
const { getCategories,getServiceDetailsByServiceId,searchServices } = require('../controllers/serviceController');


const router = express.Router();

// GET subcategories by category ID
router.get('/subcategories/:id', getSubCategories);
router.get('/categories', getCategories);
router.get('/',getServices)
router.get('/category/:id',getServicesById)
router.get('/details/:id', getServiceDetailsByServiceId);
router.get('/services/:categoryId/:subcategoryId', getServicesByCategoryAndSubcategory);
router.post('/details', createServiceDetails);
router.post('/', createService )
router.get('/search', searchServices); // *code added*
module.exports = router;
