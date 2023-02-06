const UserController = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();
const userController = new UserController();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/duplication', userController.duplication);

router.post('/refresh', userController.tokenRefresh);

router.get('/admin', userController.userlistget);

router.put('/admin/:id', userController.modifyUser);

router.get('/mypage/:id', userController.getUserInfo)

module.exports = router;