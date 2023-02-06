const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const adminCheck = require('../middlewares/admin');
const upload = require('../middlewares/multer');
const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

router.get('/', productController.getProducts);
router.post('/imageupload', upload.single('image'), (req, res) => {
  res.json({ url: req.file.location });
});
router.post('/admin', adminCheck, productController.registerProduct);
router.put('/admin/:id', adminCheck, productController.updateProduct);
router.delete('/admin/:id', adminCheck, productController.deleteProduct);
router.post(
  '/admin',
  authMiddleware,
  adminCheck,
  productController.registerProduct
);
router.put(
  '/admin/:id',
  authMiddleware,
  adminCheck,
  productController.updateProduct
);
router.delete(
  '/admin/:id',
  authMiddleware,
  adminCheck,
  productController.deleteProduct
);

module.exports = router;
