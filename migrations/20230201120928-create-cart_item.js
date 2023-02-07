'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cart_items', {
      cart_item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      item_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('Cart_items', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_Cart_items_Users',
      references: {
        table: 'Users',
        field: 'user_id',
      },
      onDelete: 'cascade', // set null ?
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Cart_items', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'FK_Cart_items_Products',
      references: {
        table: 'Products',
        field: 'product_id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cart_items');
  },
};
