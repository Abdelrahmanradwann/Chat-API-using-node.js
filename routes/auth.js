const express = require("express")
const router = express.Router();
const userController = require("../controllers/auth")



router.post("/log-in", userController.logIn)

router.post("/sign-up", userController.signUp)


module.exports = router