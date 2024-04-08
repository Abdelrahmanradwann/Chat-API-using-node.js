const express = require("express")
const mongoose = require("mongoose")
const app = express();
const { errorHandler } = require("./Middleware/errorHandler")
require("dotenv").config();
const userAuth = require("./routes/auth")
const chatOper = require("./routes/chat")
const messOper = require("./routes/messages")
const path = require("path")
const verify = require("./Middleware/verifyToken");
const validate = require("./Middleware/validates");
const exp = require("constants");

mongoose.connect(process.env.URL).then(() => {
    console.log("connected to API database")
})




app.use(express.json())

app.use("/api/profilePic/uploadProfilePic", verify.verifyToken, validate.isPermittedPic, (req, res, next) => {
  res.setHeader("Content-Type", "image/jpeg") 
  next()
}, express.static("uploadProfilePic"));

app.use("/api/audio/uploadVoiceMsg", verify.verifyToken, validate.isPermittedVoice, (req, res, next) => {
  res.setHeader("Content-Type", "audio/mp3");
  next()
}, express.static("uploadVoiceMsg"));



app.use(userAuth)
app.use(chatOper)
app.use(messOper)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
     console.log("On port 3000");
})


