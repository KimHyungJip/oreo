const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middlewares/auth-middleware');
const adminCheck = require('../middlewares/admin');

const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

router.get('/', productController.getProducts);
router.post('/admin', adminCheck, productController.registerProduct);
router.put('/admin/:id', adminCheck, productController.updateProduct);
router.delete('/admin/:id', adminCheck, productController.deleteProduct);

module.exports = router;
