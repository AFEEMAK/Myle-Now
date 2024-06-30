const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

router.use('/login', requireAuth)
// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router