const express = require('express');
const router = express.Router();
const auth_middleware = require('../middlewares/auth-middleware');
// controllers
const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

// 주문 목록 조회(관리자)
router.get('/admin', orderController.getOrderList);
//주문(cart_items들)
router.post('/', auth_middleware,orderController.postOrder);

// 주문 목록 조회(사용자)
// router.get('/orders/:id', orderController.getUserById);

module.exports = router;
