const mongoose = require("mongoose")



const friendSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }
});



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
    profilePic: {
        type: String,
        default:""
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