const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },
    readBy: [{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }],
    content: {
        type: String,
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Chat",
        required:true
    },
},
    {
     timestamps:true
    }
)

messageSchema.index({ readBy: 1 });
module.exports = mongoose.model("Message",messageSchema)