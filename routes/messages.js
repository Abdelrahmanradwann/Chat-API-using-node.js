const express = require("express");
const router = express.Router()
const verify = require("../Middleware/verifyToken")
const messageController = require("../controllers/messages")


router.post("/message/read",verify.verifyToken,messageController.updatereadBy)

router.post("/message/:chatId", verify.verifyToken, messageController.sendMessage)

router.get("/message/:chatId", verify.verifyToken, messageController.getMessage)



module.exports = router