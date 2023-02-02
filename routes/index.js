

const cartRouter = require('./cart.routes.js');


const express = require('express');
const router = express.Router();




//router.use(express.urlencoded({extended: false})),
router.use('/cart_item', cartRouter);


module.exports = router;