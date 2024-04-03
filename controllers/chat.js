const asyncHandler = require("express-async-handler")
const Chat = require("../models/chat")
const User = require("../models/user")
const Message = require("../models/message")

//One to One chat
const privateChat = asyncHandler(async (req, res) => {
    const curUserId = req.current.id
    const recieverId = req.params.id
    var chat = await Chat.findOne({
        isGroupChat: false,
        users:
        {
            $all: 
            [curUserId,recieverId]      
        }
    })

    if (chat) {
        console.log("In chat")
        const chatId = chat._id;
        const messages = await Message.find({ chat: chatId }).sort({ createdAt: -1 });
        // res.status(200).send(messages);
         res.status(200).send({chatInfo: chat, history:messages })
    }
    else {
        const recieveUser = await User.findOne({_id: recieverId})
        var chatObject = {
            chatName: recieveUser.username,
            isGroupChat: false,
            chatAdmin: [curUserId, recieverId],
            users:[curUserId,recieverId]           
        }
        const addChat = await Chat.create(chatObject)
        res.status(200).send({chatInfo: addChat, histort:[] })
    }
    

})

const groupChat = asyncHandler(async (req, res) => {
    const id = req.params.chatId;
    const checkChat = await Chat.findOne({ _id: id }).populate("users","-token -password");
    if (!checkChat) {
        return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).send(checkChat);
})

const createGroupChat = async (req, res) => {
    console.log("here")
    const curUser = req.current.id;
    const { chatName } = req.body
    if (chatName.length == 0) {
        return res.status(400).send("Chat name is required");
    }
    let newGroupChat = {
        chatName: chatName,
        isGroupChat: true,
        users: [curUser],
        chatAdmin:[curUser]
    }    
    await Chat.create(newGroupChat)
    res.status(200).json({ "New group chat is added": newGroupChat });

}

const addUserToGroup = async (req, res) => {
    const { userId } = req.body;
    const chatId = req.params.chatId;
    try {

        const updatedChat = await Chat.findOneAndUpdate(
            {
                _id: chatId,
                isGroupChat: true,
                users:{$ne:userId}
                
            },
            {
                $push: { users: userId }
            },

            { new: true }
        )
        if (updatedChat == null) {
            return res.status(400).send("This chat does not exist OR user already exists in this chat");
        }
        res.status(200).json({updatedChat:updatedChat})
    }
    catch (err) {
        console.log("In catch block")
        res.statusCode = 400;
        throw new Error(err)
    }
}


// last thing 
const renameGroup = async (req, res) => {
    const curUser = req.current.id;
    const chatId = req.params.chatId;
    const { updatedName } = req.body;
    if (updatedName.length == 0) {
        return res.status(400).send("Name is required for group chat");
    }
    let chat = null;
    //check if user is admin
    chat = await Chat.findOne(
        {
            _id: chatId,
            chatAdmin:{$in:curUser}          
        }
    )
    if (chat == null) {
        return res.status(400).send("Unauthorized access");
    }
    chat.chatName = updatedName
    await chat.save()
    res.status(200).json({
        updatedchat:chat
    })


}

module.exports = {
    privateChat,
    groupChat,
    createGroupChat,
    addUserToGroup,
    renameGroup
}