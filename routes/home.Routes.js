const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.Controller.js');

// App Routes

router.get('/', homeController.homepage);
router.get('/mypage', homeController.mypage);
router.get('/test', homeController.test);

module.exports = router;
