const express = require('express')
const router = express.Router()
const { showAllProducts, showProductsByCategory } = require('../controllers/ProductsController')
const { setProducts, deleteProducts, updateProducts } = require('../controllers/AdminProductsController')
const { addCategory } = require('../controllers/ProductsCategoryController')
const { addComment } = require('../controllers/ProductsCommentController')
const protectAdmin = require('../middleware/AuthAdminMiddlware')
const protect = require('../middleware/AuthMiddlware')



router.route('/').post(protectAdmin, setProducts)
router.route('/:id').delete(protectAdmin, deleteProducts).put(protectAdmin, updateProducts)
router.route('/category').post(protectAdmin, addCategory)
router.route('/comment').post(addComment)
router.route('/all').get(showAllProducts)
router.route('/all/:categoryid').get(showProductsByCategory)



module.exports = router