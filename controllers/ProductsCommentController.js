const ProductsComment = require('../models/ProductsCommentModel')
const Products = require('../models/ProductsModel')

const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')

// @desc Publish a comment 
// @route POST /products/comment
// @access Public
const addComment = asyncHandler(async (req, res) => {
    const comment = req.body.comment
    const userId = req.body.userid
    const productId = req.body.productid
    const strengths = req.body.content_true
    const weaknesses = req.body.content_false



    const user = await User.findById(userId)
    const product = await Products.findById(productId)


    await ProductsComment.create({
        name: user.name,
        comment: comment,
        productid: productId,
        userid: userId,
        content_false: weaknesses,
        content_true: strengths
    })





    res.json({
        Name: user.name,
        ForProduct: product.name,
        Comment: comment,

    })


})

module.exports = { addComment }