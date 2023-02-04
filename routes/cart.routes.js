const CartController = require('../controllers/cart.controller');

const express=require('express');
// const authMiddleware = require('../middlewares/auth-middleware');
const adminCheck = require('../middlewares/admin');
const router = express.Router();
const cartController = new CartController();

router.get('/',cartController.getCart);
router.post('/',adminCheck,cartController.postCart);
router.put('/',adminCheck,cartController.updateCart);
router.delete('/',adminCheck,cartController.deleteCart);


module.exports = router;