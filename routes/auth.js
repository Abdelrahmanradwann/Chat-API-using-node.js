const express = require("express")
const router = express.Router();
const userController = require("../controllers/auth")
const file = require("../Middleware/upload")
const verify = require("../Middleware/verifyToken")

router.post("/log-in", userController.logIn)

router.post("/sign-up", userController.signUp)

router.put("/edit", verify.verifyToken,file.upload.single("avatar"), userController.editProfile)

module.exports = router