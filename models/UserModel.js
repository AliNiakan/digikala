const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
name: {
    type:String,
    required: [true,'Please enter name']
},
email: {
    type:String,
    required: [true,'Please enter email'],
    unique: true
},
password: {
    type:String,
    required: [true,'Please enter password']
},
isAdmin: {
    type: Boolean,
    required: [true ,'Please set isAdmin'],
    default: false
},
lists:{
    type:Object
}
},
{
    timestamp:true
})

module.exports = mongoose.model('User', userSchema)