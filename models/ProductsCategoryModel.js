const mongoose = require('mongoose')

// create feilds for any category
const ProductsCategory = mongoose.Schema({
    categoryid:{
        type: Number
    },
    category:{
        type:String
    },
    details: {
        type:Object
    }
},
    {
        timestamp: true
    })

module.exports = mongoose.model('ProductsCategory', ProductsCategory)