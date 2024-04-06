const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    chatName: {
        type: String,
        trim:true
    },
    isGroupChat: {
        type: Boolean,
        default: false   
    },
    chatAdmin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    status: {
        type: String,
        default:""
    },
    link: String,
    expirationDate:Date
    
})

module.exports = mongoose.model("Chat",chatSchema)