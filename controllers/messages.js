const Message = require("../models/message")
const Chat = require("../models/chat")
const asyncHandler = require("express-async-handler");
const { use } = require("../routes/messages");
// SENDING
// GET ALL MESSAGES
// READ BY


const sendMessage = ( async (req, res) => {
    //senderID
    //chatID
    //content
    const curUserId = req.current.id;
    const { chatId } = req.params;
    const { content } = req.body;
    try {
        const checkChat = await Chat.findOne({ _id: chatId })
        if (checkChat == null) {
            return res.status(400).send("This is not a chat")
        }
        if (content.length == 0) {
            return res.status(400).send("Message is required")
        }
        const isMember = await checkChat.users.includes(curUserId);
        if (!isMember) {
            return res.status(400).json({msg:"You are not a member in this chat"})
        }
        const message = new Message({
        sender: curUserId,
        content: content,
        readBy: [],
        chat: chatId,
        attachment: req.file ? req.file.path.split('\\')[1] : ""
    
    })
        try {
            await message.save();
            const chat = await Chat.findOne(
                { _id: chatId }
            );
            const users = chat.users
            const server = require("../index")
            const io = server.getIo();
            if (io) {
                users.forEach(user => {
                    const recieverSocketId = userToSocket.get(user.toString());          
                    if (recieverSocketId) {
                        return io.to(recieverSocketId).emit('recieve-msg',message.content);
                    }
                })   
                return res.status(200).json({ msg: "Message sent successfully" });
            }
        } catch (err) {
            throw new Error(err)
        }
    } catch (err) {
        res.StatusCode = 400;
        throw new Error(err)
    }
    

})

const getMessage = async (req, res) => {
    const chatId = req.params.chatId;
    if (!chatId) {
        return res.status(400).send("Chat ID is required")
    }
    try {
        const chat = await Chat.findOne(
            { _id: chatId }
        )
        if (chat.length == 0) {
            return res.status(404).send("Chat not found");
        }

        const messages = await Message.find({ chat: chatId }).sort({ createdAt: -1 });
        res.status(200).send({chatInfo: chat, history:messages })
    }
    catch (err) {
        res.statusCode = 400
        throw new Error(err);
    }

}

const updateReadMsg = asyncHandler(async(req, res)=> {
    const { chatId } = req.params;
    const curUserId = req.current.id;
    if (!chatId || !curUserId) {
        return res.status(400).json({ msg: "Please send all the required fields" }); 
    }
    const isExist = await Chat.findOne({ _id: chatId, users: { $in: curUserId } });
    if (isExist == null) {
        return res.status(404).json({ msg: "Chat not found or you are not exist in this chat" });
    }
    const messages = await Message.find({ chat: chatId });
    if (messages) {
        const unreadMessages = messages.filter(message => !message.readBy.includes(curUserId));
        unreadMessages.forEach(async (message) => {
                message.readBy.push(curUserId);
                await message.save();
        });
        res.status(200).json({msg:"Messages were read by user successfully"})
    } else {
        res.status(404).json({ msg: "No messages in this chat" });
    }

})

const readBy = asyncHandler(async (req, res) => {
    const { messageId, chatId } = req.params;
    const curUserId = req.current.id;
    if (!messageId || !chatId) {
        return res.status(400).json({ msg: "Please send all the required fields" });
    }
    let isExist = await Chat.findOne({ _id: chatId, users: { $in: curUserId } });
    if (isExist == null) {
        return res.status(404).json({ msg: "You 're not a member in this chat" });
    }
    const message = await Message.findOne({ _id: messageId, chat: chatId }).populate({path:"readBy",select:"username email profilepic"});
    if (message == null) {
        return res.status(400).json({ msg: "This message is not in this chat" });
    }
    const senderId = message.sender;
    if (senderId != curUserId) {
        return res.status(400).json({ msg: "Only the sender of this message can see who has read it" });
    }
    res.status(200).json({users:message.readBy})
})



module.exports = {
    sendMessage,
    getMessage,
    updateReadMsg,
    readBy
}