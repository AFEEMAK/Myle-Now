const express = require('express')
const {

  getCategory,
  getFourCategory

} = require('../controllers/homeController')

const router = express.Router()

// GET all workouts
router.get('/', getCategory)
router.get('/four-categories', getFourCategory)




module.exports = router