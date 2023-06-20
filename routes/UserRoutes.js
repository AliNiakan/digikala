const express = require('express')
const router = express.Router()
const {registerUser , loginUser , getMe} = require('../controllers/UserController')
const protect = require('../middleware/AuthMiddlware')

router.use('/register', registerUser)
router.use('/login', loginUser)
router.use('/me', protect ,getMe)


module.exports = router