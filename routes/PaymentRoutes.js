const express = require('express')
const router = express.Router()
const {checkoutPayment} = require('../controllers/PaymentController')

router.route('/:id').get(checkoutPayment)





module.exports = router