const asyncHandler = require("express-async-handler")
const authValidation = require("../Middleware/validates")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const { generate } = require("../util/genToken")
const mail = require("../Middleware/mail")

const logIn = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body
    try {
        await authValidation.loginSchema.validate(req.body)
    }
    catch (err) {
          
          res.statusCode = 400;
          throw new Error(err);
    }
    const retrieveUser = await User.findOne({ email })
    if (!retrieveUser) {
        return res.status(400).send({ error: "email is not correct" });
    }
    const hashedPassword = retrieveUser.password;
    const checkSimilarity = await bcrypt.compare(password, hashedPassword);
    if (!checkSimilarity) {
        return res.status(400).send({ error: "password is not correct" });
    }

     const token = await generate({id:retrieveUser._id,email:retrieveUser.email});
     retrieveUser.token = token;
     retrieveUser.save();
     console.log("LoggedIn successfully")
     res.status(200).json({User:retrieveUser})

})


const signUp = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body
      try {
        await authValidation.registerSchema.validate(req.body)
    }
    catch (err) {  
          res.statusCode = 400;
          throw new Error(err);
    }
    const retrieveUser = await User.findOne({ email })
    if (retrieveUser) {
        return res.status(400).send("This email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword,
        email
    })

    const token = await generate({ id: newUser._id, email: newUser.email });
    newUser.token = token;
    await newUser.save()
    const check = await mail.confirmSignUp(email, username);
    if (check == "error") {
        const error = new Error("error in signing up");
        error.statusCode = 400;
        throw error;
    }
    res.status(200).send("User is added successfully")

})

const editProfile = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || !req.file) {
        return res.status(400).json({ msg: "Please fill all the required fields" });
    }
    let updatedUser = await User.findOneAndUpdate(
        { _id: req.current.id },
        { username, email, password, avatar: req.file.filename },
        { new: true }
    ) 
    res.status(200).json({ msg: "User data updated successfully", user: updatedUser });

})
module.exports = {
    logIn,
    signUp,
    editProfile
}