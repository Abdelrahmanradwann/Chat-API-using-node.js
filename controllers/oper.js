const User = require("../models/user")
const asyncHandler = require("express-async-handler")


const allUsers = asyncHandler(async (req, res) => {
    const curUserId = req.current.id;
    const user = await User.findOne({ _id: curUserId })
    const friends = user.friends;
    res.status(200).send({
        friends:friends
    })
})

const addUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const curUserId = req.current.id;
    User.findByIdAndUpdate(curUserId, { $push: { friends: id } }, { new: true })
        .then(updatedUser => {
            res.status(200).send("new friend added")
       })
        .catch(error => {
             res.statusCode = 400;
            throw new Error(error.message)
    });

})

module.exports = {
    allUsers,
    addUser
}