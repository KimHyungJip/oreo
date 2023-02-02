'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cart_item.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      models.Cart_item.belongsTo(models.Product, {
        foreignKey: 'product_id',
      })
    }
  }
  Cart.init({
    cart_item_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    item_quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart_item;
};