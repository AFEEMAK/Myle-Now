const express = require('express');
const {
    addServiceProvider,
    getServiceProviderById

} = require('../controllers/serviceProviderController');

const router = express.Router();

// Route to add a new service provider
router.post('/add', addServiceProvider);
router.get('/:id', getServiceProviderById);


module.exports = router;
