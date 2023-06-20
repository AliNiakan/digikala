const Products = require('../models/ProductsModel')
const asyncHandler = require('express-async-handler')
const ProductsCategory = require('../models/ProductsCategoryModel')
const ProductsDetail = require('../models/ProductsDetailModel')


// @desc Add a product
// @route Post /products
// @access Private
const setProducts = asyncHandler(async (req, res) => {
    if (!req.body.name && !req.body.price && !req.body.available && !req.body.category) {
        res.status(400)
        throw new Error('Some fields are empty')
    }
    const category = await ProductsCategory.findOne({ categoryid: req.body.categoryid })


    //Get fields 
    const keys = Object.keys(category.details)
    keys.splice(0, 2)
    //Get values 
    const values = Object.values(category.details)
    values.splice(0, 2)

    let fillData
    keys.forEach(async key => {
        fillData = ({ ...fillData, [key]: req.body[key] })
    })


    let recivedImages = req.body.images.split(' ')

    const details = await ProductsDetail.create({
        categoryid: req.body.categoryid,
        productid: category._id,
        name: req.body.name,
        details: fillData
    })
    await Products.create({
        name: req.body.name,
        price: req.body.price,
        available: req.body.available,
        details: fillData,
        category: category.category,
        images: recivedImages
    })
    console.log(category)

    res.json({
        name: req.body.name,
        price: req.body.price,
        available: req.body.available,
        category: details,
        images: recivedImages
    })
    res.status(200)
})

// @desc Delete a product
// @route Delete /products/:id
// @access Private
const deleteProducts = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }
    product.remove()
    res.json(`${product.name} with ID : ${product.id} removed.`)
})

// @desc Update a product
// @route Put /products/:id
// @access Private
const updateProducts = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }
    const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedProduct)
})

module.exports = { setProducts, deleteProducts, updateProducts } 