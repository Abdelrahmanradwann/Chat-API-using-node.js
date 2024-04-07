const mongoose = require("mongoose")


const userSchema = mongoose.Schema({

    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true
    } ,
    password: {
        type: String,
        required: true,
        min: 6,
        trim:true
    },
    avatar: {
        type: String,
        default:'default.jpeg'
    },
    friends: {
        type: Array,
        default:[]
    },
    token: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model("User",userSchema)