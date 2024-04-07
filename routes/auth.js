const express = require("express")
const router = express.Router();
const userController = require("../controllers/auth")
const file = require("../Middleware/upload")


router.post("/log-in", userController.logIn)

router.post("/sign-up",file.upload.single("avatar"), userController.signUp)


module.exports = router