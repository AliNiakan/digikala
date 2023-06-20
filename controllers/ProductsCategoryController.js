
const ProductsCategory = require('../models/ProductsCategoryModel')
const asyncHandler = require('express-async-handler')

// @desc Add a category
// @route POST /products/category
// @access Private
const addCategory = asyncHandler(async (req, res) => {
     

    await ProductsCategory.create({
        category: req.body.category,
        categoryid:req.body.categoryid,
        details: req.body
    })
    res.json(`Category: "${req.body.category}" ba ID: ${req.body.categoryid} saved.`)
})

module.exports = { addCategory }