'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.hasMany(models.Order_item, {
        foreignKey: 'product_id',
      });
      models.Product.hasMany(models.Cart_item, {
        foreignKey: 'product_id',
      });
    }
  }
  Product.init(
    {
      product_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      product_price: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      product_image: DataTypes.STRING,
      product_detail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
