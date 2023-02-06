const express = require('express');
const router = express.Router();

// controllers
const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

// 주문 목록 조회(관리자)
router.get('/admin', orderController.getOrderList);

// 주문 목록 조회(사용자)
// router.get('/orders/:id', orderController.getUserById);

module.exports = router;
