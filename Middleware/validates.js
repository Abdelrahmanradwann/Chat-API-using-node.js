const yup = require('yup');
const Chat = require("../models/chat")

const loginSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required')
});

const registerSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long')
});



const isPermitted = async (req, res, next) => {
    const userIdLink = req.originalUrl.split('/')[3];
    console.log(userIdLink+" "+"here");
    const isInSameGp = await Chat.findOne(
        { users: { $in:  [req.current.id, userIdLink]  } }
    )
    console.log(isInSameGp);
    if (!isInSameGp) {
        throw new Error("Unauthorized");
    }
    console.log("in is permitted")
    next();
}




module.exports  = {
    registerSchema,
    loginSchema,
    isPermitted
}
