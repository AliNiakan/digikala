const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    user: {
        type : String ,
        required : true,
    },
    products:{
        type : Array,
        required: true
    },
    totalprice:{
        type : Number,
        required: true
    },
    success:{
        type : Boolean,
        require: true
    },
    paymentid:{
        type : String,
        require: true
    }

},
{
    timestamp:true
})

module.exports = mongoose.model('Orders', orderSchema)