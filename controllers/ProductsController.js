const Products = require('../models/ProductsModel')
const Comments = require('../models/ProductsCommentModel')
const asyncHandler = require('express-async-handler')
const ProductsCategory = require('../models/ProductsCategoryModel')
const path = require('path')

// @desc Show all products
// @route GET /products/all
// @access Public
const showAllProducts = asyncHandler(async (req, res) => {
    const filter = {};
    const products = await Products.find(filter)
    showComments()

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(products)


})

// @desc Show products by category
// @route GET /products/all/categoryid=?
// @access Public 
const showProductsByCategory = asyncHandler(async (req, res) => {
    const category = await ProductsCategory.findOne({ categoryid: req.params.categoryid })
    const products = await Products.find({ category: category.category })
    if (products == [] || products == '') {
        res.status(404)
        throw new Error('Sorry,No products in this category try again later !')
    }
    showComments()
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(products)
})



async function showComments() {
    //Get all products 
    const filter = {};
    const products = await Products.find(filter)
    //Find comments for each products
    products.map(async (p) => {
        let foundedComment = await Comments.find({ productid: p._id })
        await Products.findByIdAndUpdate(p._id, { comments: foundedComment })
    })
}
module.exports = { showAllProducts, showProductsByCategory }  