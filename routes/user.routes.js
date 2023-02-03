const UserController = require('../controllers/user.controller.js')
const express = require('express')
const router = express.Router()
const userController = new UserController()
router.post('/signup',(req,res,next)=>{
    next()
},userController.signup)
router.post('/login',(req,res,next)=>{
    next()
},userController.login)
router.post('/duplication',(req,res,next)=>{
    next()
},userController.duplication)
router.post("/refresh",(req,res)=>{
    next()
},userController.tokenRefresh)
router.get('/admin', userController.userlistget);

module.exports = router;
