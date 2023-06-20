const asyncHandler = require('express-async-handler')
const ListModel = require('../models/ListModel')
const UserModel = require('../models/UserModel')
const ProductsModel = require('../models/ProductsModel')


// @desc Add a list of favorites products
// @route POST /lists
// @access Private
const addList = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.body.userid)
    await ListModel.create({
        userId: user.id,
        listName: req.body.listname
    }, res.json(`${req.body.listname} added `))

})


// @desc Show list
// @route GET /lists/:id
// @access Private
const showList = asyncHandler(async (req, res) => {
    const listId = req.params.id
    const foundedList = await ListModel.findById(listId)
    //Check the user [Privacy]
    if (req.body.userid === foundedList.userId) {
        res.json(foundedList)
    }
    else {
        res.status(401)
        throw new Error('you cant access that list')
    }
})


// @desc Add products to a list
// @route PUT /lists/:id
// @access Private
const addProductToList = asyncHandler(async (req, res) => {
    const listId = req.params.id
    const productId = req.body.productid

    const list = await ListModel.findById(listId)

    const findedProduct = await ProductsModel.findById(productId)
    if (!findedProduct) {
        res.status(404)
            .json({
                message: `${productId} not found.`
            })
    }
    else {
        list.products = [...list.products, productId]
        list.save()
        res.status(200)
            .json({
                message: `${productId} saved to ${list.listName}`
            })
    }
})





module.exports = { addList, addProductToList, showList }