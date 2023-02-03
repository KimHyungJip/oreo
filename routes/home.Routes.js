const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.Controller.js')


// App Routes

router.get('/', homeController.homepage22);
router.get('/mypage', homeController.mypage)


module.exports =router;