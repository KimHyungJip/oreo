const express = require('express');
const router = express.Router();

const {User} = require('../models')

// controllers
const UserController = require('../controllers/user.controller');
const userController = new UserController();



// 회원 목록 조회(관리자)
router.get('/admin', userController.userlistget);

// 회원 정보 조회(개인)
router.get('/', userController.GetUserInfo);


module.exports = router;
