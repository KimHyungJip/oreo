const UserController = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();
const userController = new UserController();
const authMiddleware = require('../middlewares/auth-middleware');
const adminCheck = require('../middlewares/admin');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/me', authMiddleware, userController.me);

router.post('/duplication', userController.duplication);

router.post('/refresh', userController.tokenRefresh);

router.get('/admin', userController.userlistget);

router.put('/admin/:id', userController.modifyUser);

router.put('/modifyinfo', authMiddleware, userController.modifyUser);

module.exports = router;
