const express = require('express');
const router = express.Router();

// 'test' 페이지 렌더링 테스트.
router.get('/test', (req, res) => {
    res.render('test', {
        title: 'Hello World!'
    })
})

const homeRouter = require('./home.Routes')
const userRouter = require('./user.routes');
const productRouter = require('./product.routes');
// const cartRouter = require('./cart.routes');
const orderRouter = require('./order.routes');

router.use('/', homeRouter)
router.use('/users', userRouter);
router.use('/products', productRouter);
// router.use('/carts', cartRouter);
router.use('/orders', orderRouter);

module.exports = router;
