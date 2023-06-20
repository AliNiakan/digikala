const express = require('express')
const router = express.Router()
const {orderProduct} = require('../controllers/BuyProductsController')

const protect = require('../middleware/AuthMiddlware')

router.route('/').post(protect,orderProduct)




module.exports = router