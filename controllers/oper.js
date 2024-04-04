const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const Chat = require("../models/chat")



const allUsers = asyncHandler(async (req, res) => {
    const curUserId = req.current.id;
    const chat = await Chat.find(
    { users: { $in: curUserId } }
    ).populate({
        path: "users",
        match: { _id: { $ne: curUserId } },
        select: "username profilepic"
    });

    res.status(200).send({
        friends:chat
    })
})

// const addUser = asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const curUserId = req.current.id;
//     User.findByIdAndUpdate(curUserId, { $push: { friends: id } }, { new: true })
//         .then(updatedUser => {
//             res.status(200).send("new friend added")
//        })
//         .catch(error => {
//              res.statusCode = 400;
//             throw new Error(error.message)
//     });

// })

module.exports = {
    allUsers,
    // addUser
}