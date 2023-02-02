'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Order, {
        foreignKey: 'user_id',
      });
      models.User.hasMany(models.Cart, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
  {
  user_id: {
  primaryKey: true,
  type: DataTypes.INTEGER,
  autoIncrement: true,
  }
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    is_admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};