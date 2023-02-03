const express = require('express');
const router = express.Router();

// const userRouter = require('./users.routes');
const productRouter = require('./product.routes');
// const cartRouter = require('./carts.routes');
// const orderRouter = require('./orders.routes');

// router.use('/users', userRouter);
router.use('/products', productRouter);
// router.use('/carts', cartRouter);
// router.use('/orders', orderRouter);

module.exports = router;
