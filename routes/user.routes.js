const UserController = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();
const userController = new UserController();



router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/duplication', userController.duplication);

router.post('/refresh', userController.tokenRefresh);

router.get('/admin', userController.userlistget);

// 회원 정보 조회(개인)
router.get('/', userController.GetUserInfo);


module.exports = router;
