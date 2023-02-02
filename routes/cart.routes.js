const CartController = require('../controllers/cart.controller');

const express=require('express');

const router = express.Router();

const cartController = new CartController

router.get('/',(req,res,next)=>{
    console.log('들어가나확인')
    next();
},cartController.getCart);

module.exports = router;