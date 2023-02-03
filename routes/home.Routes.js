const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.Controller.js')


// App Routes

router.get('/', homeController.homepage);



module.exports =router;