const CartController = require('../controllers/cart.controller');

const express = require('express');
const auth_middleware = require('../middlewares/auth-middleware');
//const adminCheck = require('../middlewares/admin');
const router = express.Router();
const cartController = new CartController();

router.get('/cart_items', auth_middleware, cartController.getCart);
router.post('/cart_items', auth_middleware, cartController.postCart);
router.put('/modifyquantity', auth_middleware, cartController.updateCart);
router.delete('/', auth_middleware, cartController.deleteCart);

module.exports = router;
