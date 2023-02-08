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

// const Sequelize = require('sequelize');

// const productModel = require('../models/product.js');

// //Get product list
// router.get('/search', async (req, res) => await productModel.findAll()
//     .then(value =>
//         res.render('/', {
//             value
//         }))
//     .catch(err => console.log(err))
// );

// // Search for products
// router.get('/search/products', async (req, res) => {
//     const {term} = req.query;
//     const search = await productModel.findAll({where: {product_name : {[Op.like]: '%' + term + '%' }}})
//     .then(value => res.render('/', {value}))
//     .catch(err => console.log(err));
// });
