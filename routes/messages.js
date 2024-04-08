const express = require("express");
const router = express.Router()
const verify = require("../Middleware/verifyToken")
const messageController = require("../controllers/messages")
const file = require("../Middleware/upload")

router.get("/message/read/:messageId/:chatId",verify.verifyToken,messageController.readBy)

router.put("/message/read/:chatId", verify.verifyToken, messageController.updateReadMsg)

router.post("/message/:chatId", verify.verifyToken,file.upload.single("avatar"), messageController.sendMessage)

router.get("/message/:chatId", verify.verifyToken, messageController.getMessage)


module.exports = router