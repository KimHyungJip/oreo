const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.Controller.js');

// App Routes

router.get('/', homeController.homepage);
router.get('/mypage', homeController.mypage);

// 관리자 관련 페이지
router.get('/admin_products', homeController.adminProducts);
router.get('/admin_users', homeController.adminUsers);
router.get('/admin_product_modify', homeController.adminProductModify);
router.get('/admin_product_register', homeController.adminProductRegister);

module.exports = router;
