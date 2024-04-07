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
const validate = require("./Middleware/validates")

mongoose.connect(process.env.URL).then(() => {
    console.log("connected to API database")
})




app.use(express.json())
app.use("/api/profilePic", verify.verifyToken, validate.isPermitted, (req, res, next) => {
  console.log("yeeah")
  res.setHeader("Content-Type", "image/jpeg")
  next()
},express.static(path.join(__dirname, "uploadProfilePic")));


app.use(userAuth)
app.use(chatOper)
app.use(messOper)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
     console.log("On port 3000");
})


