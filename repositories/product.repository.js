class ProductRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  findAllProducts = async () => {
    const products = await this.productModel.findAll({
      order: [['updatedAt', 'DESC']],
      raw: true,
    });
    return products;
  };

  findProductById = async (product_id) => {
    const product = await this.productModel.findByPk(product_id);
    return product;
  };

  createProduct = async (
    product_price,
    product_name,
    product_detail,
    product_image
  ) => {
    const createdProduct = await this.productModel.create({
      product_price,
      product_name,
      product_detail,
      product_image,
    });
    return createdProduct;
  };

  updateProduct = async (
    product_id,
    product_price,
    product_name,
    product_detail,
    product_image
  ) => {
    const updatedProduct = await this.productModel.update(
      { product_price, product_name, product_detail, product_image },
      {
        where: { product_id },
        // returning: true,
        // plain: true,
      }
    );
    return updatedProduct; // 반환값은 ['영향받은 행 개수']이다.
  };

  deleteProduct = async (product_id) => {
    const deletedProduct = await this.productModel.destroy({
      where: { product_id },
      returning: true,
      plain: true,
    });
    return deletedProduct; // 반환값은 ['영향받은 행 개수']임.
  };
}

module.exports = ProductRepository;
