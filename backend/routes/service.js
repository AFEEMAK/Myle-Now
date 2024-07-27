const express = require('express');
const {
  getSubCategories,
  createService,
  getServices,
  getServicesById,
  getServicesByCategoryAndSubcategory,
  createServiceDetails,
  getCategories,
  getServiceDetailsByServiceId,
  searchServices,
  deleteService,
  updateService
} = require('../controllers/serviceController');

const router = express.Router();

// Define routes
router.get('/subcategories/:id', getSubCategories);
router.get('/categories', getCategories);
router.get('/', getServices);
router.get('/category/:id', getServicesById);
router.get('/details/:id', getServiceDetailsByServiceId);
router.get('/services/:categoryId/:subcategoryId', getServicesByCategoryAndSubcategory);
router.post('/details', createServiceDetails);
router.post('/', createService);
router.get('/search', searchServices);
router.delete('/:id', deleteService);
router.put('/:id', updateService);
module.exports = router;
