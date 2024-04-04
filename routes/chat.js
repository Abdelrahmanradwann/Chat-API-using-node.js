const router = require("express").Router()
const chatController = require("../controllers/chat")
const verify = require("../Middleware/verifyToken")



router.post("/chat/group", verify.verifyToken, chatController.createChat)

router.post("/chat/add/group/:chatId", verify.verifyToken, chatController.addUserToGroup)

router.post("/chat/rename/:chatId", verify.verifyToken, chatController.renameGroup)

router.post("/chat/remove", verify.verifyToken, chatController.removeFromChat)

router.post("/chat/exit",verify.verifyToken,chatController.exitChat)

module.exports = router