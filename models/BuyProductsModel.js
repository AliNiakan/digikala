const mongoose = require('mongoose')


const BuyProductsSchema = mongoose.Schema({
user: {
    type : mongoose.Schema.Types.ObjectId ,
    required : true,
    ref: 'User'
},
products : {
    type : Array ,
    required : true,
    ref: 'Products'
},
paymentID: {
    type: String , 
    required: [true,'Please enter price']   
},
totalPrice: {
    type: Number , 
    required: [true,'Please enter price']  
}
},
{
    timestamp:true
})

module.exports = mongoose.model('BuyProducts', BuyProductsSchema)