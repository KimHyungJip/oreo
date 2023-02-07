const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const productRouter = require('./product.routes');
const cartRouter = require('./cart.routes');
const orderRouter = require('./order.routes');
const homeRouter = require('./home.Routes');

router.use('/', homeRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter);

module.exports = router;
