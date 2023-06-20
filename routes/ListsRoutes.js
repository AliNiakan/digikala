const express = require('express')
const router = express.Router()
const { addList, addProductToList , showList} = require('../controllers/ListController')
const protect = require('../middleware/AuthMiddlware')

router.route('/').post(protect, addList)
router.route('/:id').put(protect, addProductToList).get(protect,showList)


module.exports = router