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
const jwt = require("jsonwebtoken");
const { get } = require("http");
const bodyParser = require('body-parser');


mongoose.connect(process.env.URL).then(() => {
    console.log("connected to API database")
})



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

const server = app.listen(process.env.PORT, () => {
     console.log("On port 3000");
})




const io = require('socket.io')(server)

const getIo = () => {
  if (io) {
    return io;
  }
  throw new Error("error in IO");
}




global.userToSocket = new Map();

// Listen for 'connection' event to handle new socket connections
io.on("connection", (socket) => {

  console.log('A user connected');
  socket.on("add-user", async authtoken => {
    const token = await authtoken.token;
    const SECRET_KEY = process.env.SECRET_KEY
    const curuser = jwt.verify(token, SECRET_KEY);
    const userId = curuser.id;
    userToSocket.set(userId, socket.id);
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of userToSocket.entries()) {
      if (socketId === socket.id) {
        userToSocket.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

module.exports = {
    getIo
}



