const UserController = require('../controllers/user.controller.js');
const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware.js');
const router = express.Router();
const userController = new UserController();
const adminCheck = require('../middlewares/admin');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/me', authMiddleware, userController.me);

router.post('/duplication', userController.duplication);

router.post('/refresh', userController.tokenRefresh);

router.get('/admin', userController.userlistget);

// router.put('/admin/:id', userController.modifyUser);

router.post('/istrue', authMiddleware, userController.istrue);

router.delete('/accoutdestroy', authMiddleware, userController.accoutdestroy);

router.put('/modifyinfo', authMiddleware, userController.modifyinfo);

router.put('/modifypwd', authMiddleware, userController.modifypwd);

router.delete(
  '/admin',
  authMiddleware,
  adminCheck,
  userController.deleteUserByAdmin
);

module.exports = router;
