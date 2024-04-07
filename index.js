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

mongoose.connect(process.env.URL).then(() => {
    console.log("connected to API database")
})




app.use(express.json())
app.use("/api/profilePic", verify.verifyToken, express.static(path.join(__dirname, "uploadsProfilePic")));

app.use(userAuth)
app.use(chatOper)
app.use(messOper)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
     console.log("On port 3000");
})


