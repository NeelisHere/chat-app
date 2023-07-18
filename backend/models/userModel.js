const mongoose = require('mongoose')

const userSchema = {
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type: String,
        default: 'https://icon-library.com/images/141782.svg.svg'
    },
}
const userModel = mongoose.Schema(userSchema)
const User = mongoose.model('User', userModel)

module.exports = User

