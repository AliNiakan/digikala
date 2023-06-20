const mongoose = require('mongoose')

// create feilds for any category
const ProductsComments = mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'comment field is empty']
    },
    productid: {
        type: String,
        required: [true, 'productid field is empty']
    },
    userid: {
        type: String,
        required: [true, 'userid field is empty']
    },
    name: {
        type: String,
        required: [true, 'userid field is empty']
    },
    content_false: {
        type: String
    }, 
    content_true: {
        type: String
    },
},
    {
        timestamp: true
    })

module.exports = mongoose.model('ProductsComments', ProductsComments)