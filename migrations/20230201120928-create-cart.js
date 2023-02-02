'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      cart_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      product_id: {
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
    await queryInterface.addConstraint('Carts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_Carts_Users',
      references: {
        table: 'Users',
        field: 'user_id',
      },
      onDelete: 'cascade', // set null ?
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Carts', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'FK_Carts_Products',
      references: {
        table: 'Products',
        field: 'product_id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};