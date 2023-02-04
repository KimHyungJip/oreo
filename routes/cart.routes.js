const CartController = require('../controllers/cart.controller');

const express=require('express');
//const AuthMiddleware = require('../controllers/auth.controller.js');
const router = express.Router();
//const authMiddleware = new AuthMiddleware();
const cartController = new CartController();

router.get('/',cartController.getCart);
router.post('/', (req, res, next) => {
    console.log('장바구니등록');
    next();
}, cartController.postCart);

router.put('/',cartController.updateCart);
router.delete('/',cartController.deleteCart);


module.exports = router;