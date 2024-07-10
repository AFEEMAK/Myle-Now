const express = require('express')
const {

  getCategory

} = require('../controllers/homeController')

const router = express.Router()

// GET all workouts
router.get('/', getCategory)




module.exports = router