const router = require("express").Router()
const chatController = require("../controllers/chat")
const verify = require("../Middleware/verifyToken")


router.get("/chat/:chatId", verify.verifyToken, chatController.getChat)

router.post("/chat/group", verify.verifyToken, chatController.createChat)

router.post("/chat/add/group/:chatId", verify.verifyToken, chatController.addUserToGroup)

router.post("/chat/rename/:chatId",verify.verifyToken,chatController.renameGroup)

module.exports = router