const mongoose = require('mongoose')


const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    price: {
        type: Number,
        required: [true, 'Please enter price']
    },
    available: {
        type: Number,
        required: [true, 'Please enter number']
    },
    details: {
        type: Object,
        required: [true, 'Please enter details']
    },
    category: {
        type: String,
        required: [true, 'Please enter category']
    },
    images: {
        type: Array,
    },
    comments: {
        type: Array
    },


},
    {
        timestamp: true
    })

module.exports = mongoose.model('Products', ProductsSchema)