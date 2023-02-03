const express = require('express');
const router = express.Router();
const homecontroller = require('../controllers/home.controller.js');

// App Routes

router.get('/', homecontroller.homepage);

module.exports = router;
