'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_items', {
      order_item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      item_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Order_items', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'FK_Order_items_Orders',
      references: {
        table: 'Orders',
        field: 'order_id',
      },
      onDelete: 'cascade', // set null ?
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Order_items', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'FK_Order_items_Products',
      references: {
        table: 'Products',
        field: 'product_id',
      },
      onDelete: 'cascade', // set null ?
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_items');
  }
};