const ProductRepository = require('../repositories/product.repository');
const { Product } = require('../models');

class ProductService {
  productRepository = new ProductRepository(Product);

  findAllProducts = async () => {
    const products = await this.productRepository.findAllProducts();
    return products;
  };

  findProductById = async (id) => {
    const product = await this.productRepository.findProductById(id);
    return product;
  };

  createProduct = async (
    product_price,
    product_name,
    product_detail,
    product_image
  ) => {
    const createdProduct = await this.productRepository.createProduct(
      product_price,
      product_name,
      product_detail,
      product_image
    );
    return createdProduct;
    // return {
    //   product_id: createdProduct.null,
    //   product_price: createdProduct.product_price,
    //   product_name: createdProduct.product_name,
    //   product_detail: createdProduct.product_detail,
    //   product_image: createdProduct.product_image,
    //   createdAt: createdProduct.createdAt,
    //   updatedAt: createdProduct.updatedAt,
    // }
  };

  updateProduct = async (
    product_id,
    product_price,
    product_name,
    product_detail,
    product_image
  ) => {
    let findProduct = await this.productRepository.findProductById(product_id);
    if (!findProduct) {
      throw new Error('해당 id의 상품이 존재하지 않습니다.');
    }

    await this.productRepository.updateProduct(
      product_id,
      product_price,
      product_name,
      product_detail,
      product_image
    );

    findProduct = await this.productRepository.findProductById(product_id);
    return findProduct;
  };

  deleteProduct = async (product_id) => {
    let findProduct = await this.productRepository.findProductById(product_id);
    if (!findProduct) {
      throw new Error('해당 id의 상품이 존재하지 않습니다.');
    }

    await this.productRepository.deleteProduct(product_id);

    findProduct = await this.productRepository.findProductById(product_id);
    return findProduct;
  };

  getAllProductList = async () => {
    const products = await this.productRepository.getAllProductList();
  };

  searchAllProducts = async (term) => {
    const results = await this.productRepository.searchAllProducts(term);
    return results;
  };
}

module.exports = ProductService;
