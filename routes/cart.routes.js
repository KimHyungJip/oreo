const CartController = require('../controllers/cart.controller');

const express=require('express');
//const AuthMiddleware = require('../controllers/auth.controller.js');
const router = express.Router();
//const authMiddleware = new AuthMiddleware();
const cartController = new CartController();

router.get('/',cartController.getCart);

module.exports = router;