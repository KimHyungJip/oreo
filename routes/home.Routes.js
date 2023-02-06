const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.Controller.js');
const authMiddleware = require('../middlewares/auth-middleware');
const admincheck = require('../middlewares/admin');

// App Routes
router.get('/', homeController.homepage);
router.get('/mypage', authMiddleware, homeController.mypage);
router.get('/cart', homeController.cart);

// 관리자 관련 페이지
router.get('/admin_index', homeController.adminIndex);
router.get('/admin_products', homeController.adminProducts);
router.get('/admin_users', homeController.adminUsers);
router.get('/admin_product_modify', homeController.adminProductModify);
router.get('/admin_product_register', homeController.adminProductRegister);
router.get('/admin_user_modify', homeController.adminUserModify);

// 회원가입 및 로그인
router.get('/loginpage', homeController.loginpage);
router.get('/signuppage', homeController.signuppage);

module.exports = router;
