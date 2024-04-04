const express = require("express")
const mongoose = require("mongoose")
const app = express();
const { errorHandler } = require("./Middleware/errorHandler")
require("dotenv").config();
const userAuth = require("./routes/auth")
const userOper = require("./routes/oper")
const chatOper = require("./routes/chat")
const messOper = require("./routes/messages")

mongoose.connect(process.env.URL).then(() => {
    console.log("connected to API database")
})

app.use(express.json())

app.use(userAuth)
app.use(userOper)
app.use(chatOper)
app.use(messOper)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
     console.log("On port 3000");
})
