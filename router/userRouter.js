const router = require("express").Router()
const{user,login}= require("../Controller/userController.js")

//const {authenticate} = require("../middleware/authenticate.js")



router.post("/user",user)

router.post("/login", login)


module.exports=router

