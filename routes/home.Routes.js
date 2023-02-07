const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.Controller.js');
const authMiddleware = require('../middlewares/auth-middleware');
const adminCheck = require('../middlewares/admin');

// App Routes
router.get('/', homeController.homepage);
router.get('/mypage', homeController.mypage);
router.get('/cart', homeController.cart);
router.get('/myorders', homeController.myOrders);

// 관리자 관련 페이지
router.get('/admin_index', homeController.adminIndex);
router.get('/admin_products', homeController.adminProducts);
router.get('/admin_users', homeController.adminUsers);
router.get('/admin_product_modify', homeController.adminProductModify);
router.get('/admin_product_register', homeController.adminProductRegister);
router.get('/admin_user_modify', homeController.adminUserModify);

router.get('/login', homeController.loginpage);
router.get('/signup', homeController.signuppage);
module.exports = router;
