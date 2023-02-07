const { Order_item, Order, User, Product, Sequelize } = require('../models');

class OrderRepository {
  constructor(OrderModel) {
    this.orderModel = OrderModel;
  }

  // 주문 목록 조회(관리자)
  getOrderList = async () => {
    const orderList = await this.orderModel.findAll({
      include: [
      {
        model: Order_item,
        as: 'order_item',
        attributes: ['product_id', 'item_quantity'],
        include: [
            {
              model: Product,
              as: 'product',
              attributes: ['product_price', 'product_image'],
            }
          ]
      },
        {
          model: User,
          as: 'user',
          attributes: ['address', 'phone', 'email'],
        }
    ],
    // raw: true,
    // plain: true,
    order: [['createdAt', 'DESC']],
    attributes: ['order_id', 'user_id', 'createdAt'],
    });
    return orderList;
  };

  // 주문 목록 조회 (사용자)
  getOrdersByUserId = async (user_id) => {
    const orders = await this.orderModel.findAll({
      include: [
        {
          model: Order_item,
          as: 'order_item',
          attributes: ['item_quantity'],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              // attributes: ['product_price'],
            }
          ]
        },
      ],
      where: { user_id },
      // raw: true,
      order: [['createdAt', 'DESC']],
    });

    return orders;
  };

  //order table에 넣음
  orderCreate = async (user_id) => {
    const createOrder = await this.orderModel.create({
      user_id,
    });
    return createOrder;
  };
}

module.exports = OrderRepository;
