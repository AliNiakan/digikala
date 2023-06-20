const mongoose = require('mongoose')

// neshan dadan eteleat mahsol

const ProductsDetailModel = mongoose.Schema({
    categoryid: {
        type: Number,
    },
    productid: {
        type: String,
    },
    name: {
        type: String
    },
    details: {
        type: Object
    }
},
    {
        timestamp: true
    })

module.exports = mongoose.model('ProductsDetail', ProductsDetailModel)