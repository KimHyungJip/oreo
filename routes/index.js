const express = require('express');
const router = express.Router();

const homeRouter = require('./home.Routes');
const userRouter = require('./user.routes');
const productRouter = require('./product.routes');
const cartRouter = require('./cart.routes');
const orderRouter = require('./order.routes');

router.use('/', homeRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart_items', cartRouter);
router.use('/orders', orderRouter);

module.exports = router;
