
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.Controller.js');

// App Routes

router.get('/', homeController.homepage);

//마이페이지 관련
router.get('/mypage', homeController.mypage);
router.get('/mypage/:user_id', homeController.mypage)

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