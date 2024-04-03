const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    readBy: [{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }],
    content: {
        type: String,
        required: true,
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
},
    {
     timestamps:true
    }
)

module.exports = mongoose.model("Message",messageSchema)