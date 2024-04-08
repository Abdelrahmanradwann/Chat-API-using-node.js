const yup = require('yup');
const Chat = require("../models/chat")
const Message = require("../models/message")

const loginSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required')
});

const registerSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long')
});



const isPermittedPic = async (req, res, next) => {
   
    let userIdLink = req.originalUrl.split('/')[4]
    console.log(userIdLink)
    userIdLink = userIdLink.split('.')[0];
    console.log(userIdLink+" "+req.current.id);
    const isInSameGp = await Chat.findOne(
        { users: { $in:  [req.current.id, userIdLink]  } }
    )
    if (!isInSameGp) {
       return res.status(400).json({ msg: "Unauthorized" });
    }
    next();
}


const isPermittedVoice = async (req, res, next) => {
    let voiceId = req.originalUrl.split('/')[4]
    if (!voiceId) {
         return res.status(400).json({ msg: "Bad request" });
    }
    const msg = await Message.findOne(
        { attachment: voiceId }
    )
    if (!msg) {
        return res.status(404).json({ msg: "Message not found" });
    }
    const chat = await Chat.findOne(
        {_id: msg.chat}
    )
    const isUserValid = chat.users.includes(req.current.id);
    if (!isUserValid) {
        return res.status(400).json({ msg: "Unauthorized" });
    }
    next();

}




module.exports  = {
    registerSchema,
    loginSchema,
    isPermittedPic,
    isPermittedVoice
}
