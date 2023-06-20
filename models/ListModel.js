const mongoose = require('mongoose')

 
const ListModel= mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Add user id']
    },
    listName: {
        type: Object,
        required: [true, 'Add name for your list']
    },
    products:{
        type:Array
    }
},
    {
        timestamp: true
    })

module.exports = mongoose.model('ListModel', ListModel)