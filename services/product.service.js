const ProductRepository = require('../repositories/product.repository');
const { Product } = require('../models');

class ProductService {
  productRepository = new ProductRepository(Product);

  //
  findAllProducts = async () => {
    const products = await this.productRepository.findAllProducts();

    // 최신순 정렬 (DB단에서 하도록 하는게 나을까?)
    products.sort((a, b) => {
      return b.updatedAt - a.updatedAt;
    });
    return products;
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
    // product_id로 수정할 데이터가 있는지 검사.
    let findProduct = await this.productRepository.findProductById(product_id);
    if (!findProduct) {
      throw new Error('해당 id의 상품이 존재하지 않습니다.');
    }

    await this.productRepository.updateProduct(
      // update()의 반환값은 영향받은 행의 개수
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
    // product_id로 수정할 데이터가 있는지 검사.
    let findProduct = await this.productRepository.findProductById(product_id);
    if (!findProduct) {
      throw new Error('해당 id의 상품이 존재하지 않습니다.');
    }
    // findProduct.destroy(); // => service계층에서 이렇게 해도 되나?
    await this.productRepository.deleteProduct(product_id);
    findProduct = await this.productRepository.findProductById(product_id);
    return findProduct;
  };
}

module.exports = ProductService;
