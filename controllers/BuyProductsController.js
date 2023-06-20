const Products = require('../models/ProductsModel')
const User = require('../models/UserModel')
const BuyProducts = require('../models/BuyProductsModel')
const asyncHandler = require('express-async-handler')
const randomstring = require("randomstring")





// @desc Add a product to order list
// @route POST /products/order
// @access Private
const orderProduct = asyncHandler(async (req, res) => {
  let { productId, userId } = req.body
  productId = await productId.split(',')

  let item = []
  let prices = []
  for (let i = 0; i < productId.length; i++) {
    let userCart = await Products.findById(productId[i])
    let priceCart = userCart.price

    item.push(userCart)
    prices.push(priceCart)
    if(userCart.available > 0){
    userCart.available-=1
    await userCart.save()
    console.log(userCart.available)
    }
    else{
      return console.log("That product not available")
    }

  }
  
  let sumPrices = 0
  for (let i = 0; i < prices.length; i++) {
    sumPrices += prices[i];
  }

  const paymentId = randomstring.generate();
  const user = await User.findById(userId)

  //Add product to DB
  await BuyProducts.create({
    user: user,
    products: item,
    paymentID: paymentId,
    totalPrice: sumPrices
  })
  
})




module.exports = { orderProduct } 