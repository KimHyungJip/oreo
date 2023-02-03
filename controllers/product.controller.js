const ProductService = require('../services/product.service');
const jwt = require('jsonwebtoken');
// joi 스키마 임포트

class ProductController {
  productService = new ProductService();

  getProducts = async (req, res) => {
    try {
      const products = await this.productService.findAllProducts();
      return res.status(200).json({
        products,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
      });
    }
  };

  registerProduct = async (req, res) => {
    const { product_name, product_price, product_detail, product_image } =
      req.body;
    console.log(product_name, product_price, product_detail, product_image);
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
      return res.status(201).json({ product });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
        errorStack: error.stack,
      });
    }
  };

  updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { product_name, product_price, product_detail, product_image } =
      req.body;

    // Q. product_id가 없을 때 => 유효한 id가 아니거나 빈 값일 때
    // => repository 계층에서 알아서 null을 반환할 것이므로 service에서 받아서 커스텀 error를 던지게 된다.
    // 하위 계층에서 던지는 모든 에러를 아래의 try catch 문에서 받고 있으므로
    // 현 시점에 따로 product_id의 유효성 검사를 할 필요는 없다.

    // Q. id에 아예 아무것도 안 넣은 경우= undefined나 null인 경우(?),
    // 어떻게 해도 백에서 처리할 방법이 없다고 했던 것 같다....

    // body 데이터가 제대로 안 들어왔을 때
    if (!product_name || !product_price || !product_detail || !product_image) {
      return res.status(400).json({
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      });
    }

    // 상품 업데이트 진행
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
      // console.log(error.message);
      return res.json({
        errorCode: error.statusCode,
        errorMessage: error.message,
        errorStack: error.stack,
        errorStackTrace: error.stackTrace,
      });
    }
  };

  deleteProduct = async (req, res) => {
    const { id } = req.params;
    // id가 undefined나 null이 어떻게 가능한가

    try {
      const deleted = await this.productService.deleteProduct(id);
      return res.status(200).json({
        message: '상품 삭제가 완료되었습니다',
        deleted,
      });
    } catch (error) {
      return res.status(500).json({
        errorCode: error.statusCode,
        errorMessage: error.message,
        errorStack: error.stack,
        errorStackTrace: error.stackTrace,
      });
    }
  };
}

module.exports = ProductController;
