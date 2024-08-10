const express = require('express');
const {
    addServiceProvider,

} = require('../controllers/serviceProviderController');

const router = express.Router();

// Route to add a new service provider
router.post('/add', addServiceProvider);


module.exports = router;
