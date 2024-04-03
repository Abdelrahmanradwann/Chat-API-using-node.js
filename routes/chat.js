const router = require("express").Router()
const chatController = require("../controllers/chat")
const verify = require("../Middleware/verifyToken")


router.get("/chat/:id", verify.verifyToken, chatController.privateChat)

router.get("/chat/group/:chatId", verify.verifyToken, chatController.groupChat)

router.post("/chat/group", verify.verifyToken, chatController.createGroupChat)

router.post("/chat/add/group/:chatId", verify.verifyToken, chatController.addUserToGroup)

router.post("/chat/rename/:chatId",verify.verifyToken,chatController.renameGroup)

module.exports = router