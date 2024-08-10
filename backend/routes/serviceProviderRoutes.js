const express = require('express');
const {
    addServiceProvider,
    getServiceProviders,
    getServiceProviderById,
    updateServiceProvider,
    deleteServiceProvider
} = require('../controllers/serviceProviderController');

const router = express.Router();

// Route to add a new service provider
router.post('/add', addServiceProvider);


module.exports = router;
