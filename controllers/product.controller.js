const ProductService = require('../services/product.service');
const jwt = require('jsonwebtoken');
// joi 스키마 임포트

class ProductController {
  productService = new ProductService();

  // 전체 상품 조회 - '수정 날짜' 기준 최신순 정렬
  getProducts = async (req, res) => {
    try {
      const products = await this.productService.findAllProducts();
      return res.status(200).json({
        products,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
        error: error,
      });
    }
  };

  // 상품 등록
  registerProduct = async (req, res) => {
    const { product_name, product_price, product_detail, product_image } =
      req.body;

    // body 데이터가 제대로 안 들어왔을 때
    if (!product_name || !product_price || !product_detail || !product_image) {
      return res.status(400).json({
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      });
    }

    try {
      const product = await this.productService.createProduct(
        product_price,
        product_name,
        product_detail,
        product_image
      );
      return res.status(201).json({
        message: '상품 등록이 완료되었습니다.',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
        error: error,
      });
    }
  };

  updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { product_name, product_price, product_detail, product_image } =
      req.body;

    // body 데이터가 제대로 안 들어왔을 때
    if (!product_name || !product_price || !product_detail || !product_image) {
      return res.status(400).json({
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      });
    }

    try {
      const updated = await this.productService.updateProduct(
        id,
        product_price,
        product_name,
        product_detail,
        product_image
      );
      return res.status(200).json({
        message: '상품 수정이 완료되었습니다.',
        updated,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
        error: error,
      });
    }
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await this.productService.deleteProduct(id);
      return res.status(200).json({
        message: '상품 삭제가 완료되었습니다',
        deleted,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
        error: error,
      });
    }
  };
}

module.exports = ProductController;
