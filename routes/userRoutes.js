const express = require("express")
const { registerUser, loginUser, currentUser } = require("../controllers/userContoller")
// const router = require("./contactroutes")
// Make a middleware which helps us to validate the token which client is sending in request as a bearer 
const validateToken = require("../middleware/validateToken")
const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)


router.get("/current", validateToken, currentUser)

module.exports = router