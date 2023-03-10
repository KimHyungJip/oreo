const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const adminCheck = require('../middlewares/admin');

// controllers
const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

// 주문 목록 조회(관리자)
router.get('/admin', authMiddleware, adminCheck, orderController.getOrderList);

// 주문 목록 조회(사용자)
router.get('/', authMiddleware, orderController.getOrdersByUserId);

//주문(cart_items들)
router.post('/', authMiddleware, orderController.postOrder);

module.exports = router;
