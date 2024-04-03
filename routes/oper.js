const express = require("express")
const router = express.Router();
const userController = require("../controllers/oper")
const verify = require("../Middleware/verifyToken")

router.get("/users", verify.verifyToken, userController.allUsers)

// router.post("/add-user/:id",verify.verifyToken,userController.addUser)

module.exports = router