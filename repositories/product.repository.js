const { render } = require('ejs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    const product = await this.productModel.findByPk(product_id, { raw: true });
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

  getAllProductList = async () => {
    const searchlist = await this.productModel.findAll();
    return searchlist;
  };

  searchAllProducts = async (term) => {
    console.log('여긴 레포지토리, 검색한 키워드는?', term);
    const searchdata = await this.productModel.findAll({
      where: {
        [Op.or]: [
          { product_name: { [Op.like]: '%' + term + '%' } },
          { product_detail: { [Op.like]: '%' + term + '%' } },
        ],
      },
    });
    return searchdata;
  };
}

module.exports = ProductRepository;
