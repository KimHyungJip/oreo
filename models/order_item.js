'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order_item.belongsTo(models.Order, {
        foreignKey: 'order_id',
      });
      models.Order_item.belongsTo(models.Product, {
        foreignKey: 'product_id',
      });
    }
  }
  Order_item.init({
    order_item_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    item_quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_item',
  });
  return Order_item;
};