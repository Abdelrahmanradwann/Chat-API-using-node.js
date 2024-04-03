const asyncHandler = require("express-async-handler")
const Chat = require("../models/chat")
const User = require("../models/user")
const Message = require("../models/message")

//One to One chat

const getChat = async (req, res) => {
    console.log("in get chat")
    const chatId = req.params.chatId;
    try {
        const chat = await Chat.findOne(
            { _id: chatId }
        )
        if (chat.length == 0) {
            return res.status(400).send("Chat not found");
        }

        const messages = await Message.find({ chat: chatId }).sort({ createdAt: -1 });
        res.status(200).send({chatInfo: chat, history:messages })
    }
    catch (err) {
        res.statusCode = 400
        throw new Error(err);
    }

}



const createChat = async (req, res) => {
    console.log("here")
    const curUser = req.current.id;
    const { chatName, members,isGroupChat ,chatAdmin} = req.body;
    if (chatName.length == 0) {
        return res.status(400).send("Chat name is required");
    }
    console.log(curUser);
    const users = [curUser, ...members];

    let newGroupChat = {
        chatName: chatName,
        isGroupChat:isGroupChat,
        users: users,
        chatAdmin: chatAdmin
    };    

    try {
        const createdChat = await Chat.create(newGroupChat);
        res.status(200).json({ "New group chat is added": createdChat });
    } catch (error) {
        console.error("Error creating group chat:", error);
        res.status(500).send("Internal server error");
    }
};

const addUserToGroup = async (req, res) => {
    const { userId } = req.body;
    const chatId = req.params.chatId;
    try {
        const chat = await Chat.findOne({ _id: chatId, isGroupChat: true });
        if (!chat) {
            return res.status(400).send("This chat does not exist or is not a group chat");
        }
        // Filter out the userIds that already exist in the chat
        const newUserIds = userId.filter(id => !chat.users.includes(id));

        if (newUserIds.length === 0) {
            return res.status(400).send("All users already exist in this chat");
        }

    
        //$each is used with $push to add each element in the object
        const updatedChat = await Chat.findOneAndUpdate(
            { _id: chatId },
            { $push: { users: { $each: newUserIds } } },
            { new: true }
        );

        res.status(200).json({ updatedChat: updatedChat });
    } catch (err) {
        console.error("Error adding user(s) to group chat:", err);
        res.status(500).send("Internal server error");
    }
};



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
    getChat,
    createChat,
    addUserToGroup,
    renameGroup
}